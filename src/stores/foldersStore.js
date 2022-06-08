import { defineStore } from 'pinia';
import http from "@/assets/scripts/axios-config";
import Fuse from "fuse.js";
import { API_NOTES_URL, API_FOLDERS_URL, API_SHARED_NOTES } from "../../config";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { QuillBinding } from "y-quill";
import { useUserStore } from "@/stores/userStore";

function createCustomTimeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

export const useFoldersStore = defineStore('folders', {
    state: () => {
        return {
            draggedElement: null,
            items: [],
            root: [],
            rootFolderId: null,
            sharedFolderId: -2,
            contextMenu: {
                x: 0,
                y: 0,
                show: false,
                target: null,
            },
            editingTarget: null,
            editingTargetElement: null,
            openRoot: false,
            selectedNote: {
                id: null,
                title: '',
                content: {
                    "ops": [
                        {
                            "insert": "ciao"
                        }
                    ]
                }
            },
            quillRef: null,
            showShareDialog: false,
            shareDialogMode: 'get', //get, import
            fuse: new Fuse([], {
                threshold: 0.5,
                keys: ['title', 'type', 'favorite'],
                useExtendedSearch: true,
            }),
            provider: null,
            ydoc: null,
            textOb: null,
            firstTime: true,
        };
    },
    getters: {
        itemsMap: (state) => {
            return new Map(state.items.map((x) => [x.id, x]));
        },
    },
    actions: {
        async init() {
            let notes, folders, shared;
            try {
                [notes, folders, shared] = await Promise.all([
                    http.get(API_NOTES_URL),
                    http.get(API_FOLDERS_URL),
                    http.get(API_SHARED_NOTES)
                ]);
                this.rootFolderId = folders.data.rootFolder._id;
            } catch (error) {
                this.items = [];
                this.root = [];
                console.error(error);
                return;
            }
            let sharedNotes
            try {
                sharedNotes = await Promise.allSettled(shared.data.map(
                    x => http.get(`${API_SHARED_NOTES}/share/${x.userid}/${x.noteid}`)
                ));
                sharedNotes = sharedNotes.filter(x => x.status != 'rejected').map(x => x.value.data);
                let lookup = new Map();
                sharedNotes.forEach(x => lookup.set(x._id, x));
                shared.data.forEach(x => lookup.get(x.noteid).userId = x.userid);
            } catch (error) {
                sharedNotes = [];
                console.error(error);
                return;
            }
            let sharedFolderId = this.sharedFolderId;
            let itemsList = [
                {
                    id: this.rootFolderId,
                    father: null,
                    title: 'Le mie note',
                    type: 'folder',
                },
                {
                    id: this.sharedFolderId,
                    father: null,
                    title: 'Note condivise',
                    type: 'folder',
                },
                ...folders.data.folders.map(x => ({
                    id: x._id,
                    father: x.parent,
                    title: x.name,
                    type: 'folder',
                })),
                ...notes.data.documents.map(x => ({
                    id: x._id,
                    father: x.parent,
                    title: x.name,
                    type: 'note',
                    content: JSON.parse(x.content),
                    shared: x.shared,
                    favorite: x.starred,
                    updated: new Date(x.updated),
                })),
                ...sharedNotes.map(x => ({
                    id: x._id,
                    father: sharedFolderId,
                    title: x.name,
                    type: 'note',
                    content: JSON.parse(x.content),
                    shared: x.shared,
                    favorite: false,
                    updated: new Date(x.updated),
                    userId: x.userId,
                }))
            ];
            for (let item of itemsList) {
                if (item.type == 'folder') {
                    item.children = [];
                } else {
                    item.saved = 2;
                }
            }
            //console.log(itemsList);
            this.items = itemsList;
            this.root.length = 0;
            for (let [id, item] of this.itemsMap) {
                if (item.father != null) {
                    let father = this.itemsMap.get(item.father);
                    if (father) {
                        father.children.push(item);
                    } else {
                        console.error(item);
                    }
                } else {
                    this.root.push(item);
                }
            }
            this.updateFuse();
            console.log(this.items);
        },
        async move(target, destination) {
            if (target == destination) return;
            if (destination.children.includes(target)) return;
            if (destination.id == this.sharedFolderId) return;
            if (target.father == this.sharedFolderId) return;
            let temp = destination.father;
            while (temp != null) {
                if (temp == target.id) return;
                temp = this.itemsMap.get(temp).father;
            }
            let father = this.itemsMap.get(target.father);
            this.draggedElement = null;
            try {
                let data = {
                    newname: target.title,
                    newparent: destination.id,
                };
                if (target.type == 'note') data.newcontent = target.content;
                await http.put(`${target.type == 'folder' ? API_FOLDERS_URL : API_NOTES_URL}/${target.id}`, data);
            } catch (error) {
                console.error(error);
                return;
            }
            target.father = destination.id;
            if (father) {
                father.children.splice(
                    father.children.indexOf(target),
                    1
                );
            } else {
                this.root.splice(
                    this.root.indexOf(target),
                    1
                );
            }
            destination.children.push(target);
        },
        async delete(target) {
            try {
                await http.delete(`${target.type == 'folder' ? API_FOLDERS_URL : API_NOTES_URL}/${target.id}`);
            } catch (error) {
                console.error(error);
                return;
            }
            let father = this.itemsMap.get(target.father);
            if (father) father.children.splice(
                father.children.indexOf(target),
                1
            );
            this.items.splice(this.items.indexOf(target), 1);
        },
        closeMenu() {
            this.contextMenu.show = false;
            this.contextMenu.target = null;
        },
        async addItem(type) {
            let id;
            do {
                id = Math.floor(Math.random() * 1000);
            } while (this.itemsMap.has(id));
            let obj = {
                id,
                father: this.rootFolderId,
                title: `${type == 'folder' ? 'Cartella' : 'Nota'} #${id}`,
                type,
            }
            if (type == 'folder') {
                obj.children = [];
            } else {
                obj.saved = 2;
                obj.favorite = false;
            }
            try {
                let response = await http.post(type == 'folder' ? API_FOLDERS_URL : API_NOTES_URL, {
                    name: obj.title,
                    parent: this.rootFolderId
                });
                obj.id = response.data._id;
                obj.content = response.data.content;
                console.log(obj);
            } catch (error) {
                console.error(error);
                return null;
            }
            this.items.push(obj);
            this.itemsMap.get(this.rootFolderId).children.push(obj);
            return obj;
        },
        updateFuse() {
            this.fuse.setCollection(this.items.filter(x => x.type == 'note'));
        },
        async changeSelectedNote(newNote) {
            console.log(newNote.title);
            if (this.provider || this.ydoc) {
                await this.provider.destroy();
                await this.ydoc.destroy();
                this.provider = null;
                this.ydoc = null;
            }
            if (
                newNote.father ==
                this.sharedFolderId ||
                newNote.shared
            ) {
                console.log("Crea nuova connessione websocket");
                await this.joinWebsocket(
                    newNote.userId ||
                    useUserStore().decode()._id,
                    newNote.id
                );
            }
            if (newNote.saved != 0) newNote.saved = 2;
            this.selectedNote = newNote;
            this.quillRef.setContents(newNote.content);
        },
        // create the ydoc object and connect to the server using websockets
        // then bind ydoc to the editor
        async joinWebsocket(userId, noteId) {
            const ydoc = new Y.Doc();
            this.ydoc = ydoc;
            let ROOMNAME = `${userId}:${noteId}`;
            let URL = "wss://api.noteapp-is2.tk/ws";
            const wsProvider = new WebsocketProvider(URL, ROOMNAME, ydoc, {
                params: {
                    auth: useUserStore().authToken,
                },
            });
            this.provider = wsProvider;
            wsProvider.on("status", (event) => {
                console.log(event.status); // logs "connected" or "disconnected"
            });
            const textOb = ydoc.getText(`${noteId}-4`);
            this.textOb = textOb;
            let firstTime = this.firstTime;
            setTimeout(this.timeOutconnection, 500); // metodo non stabile per reti lente o note troppo grandi
            textOb.observe((event) => {
                // print updates when the data changes
                if (event.transaction.origin != null) {
                    console.log(textOb.toString());
                    this.selectedNote.content = textOb.toDelta();
                    this.quillRef.setContents(this.selectedNote.content);
                }
            });
        },
        timeOutconnection() {
            this.firstTime = false;
            if (this.textOb.toString() == '') {
                console.log('OK');
                this.textOb.applyDelta(this.selectedNote.content.ops);
                return;
            }
        },
        sendUpdate(change) {
            console.log(change);
            if (change.source == 'user') {
                this.textOb.applyDelta(change.delta.ops);
            }
        },
    }
});