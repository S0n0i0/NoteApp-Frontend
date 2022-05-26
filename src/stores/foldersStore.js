import { defineStore } from 'pinia';
import http from "@/assets/scripts/axios-config";
import { API_NOTES_URL, API_FOLDERS_URL } from "../../config";

export const useFoldersStore = defineStore('folders', {
    state: () => {
        return {
            draggedElement: null,
            items: [],
            root: [],
            rootFolderId: null,
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
        };
    },
    getters: {
        itemsMap: (state) => {
            return new Map(state.items.map((x) => [x.id, x]));
        },
    },
    actions: {
        async init() {
            let notes, folders;
            try {
                [notes, folders] = await Promise.all([
                    http.get(API_NOTES_URL),
                    http.get(API_FOLDERS_URL)
                ]);
                this.rootFolderId = folders.data.rootFolder._id;
            } catch (error) {
                this.items = [];
                this.root = [];
                console.error(error);
                return;
            }
            let itemsList = [
                {
                    id: this.rootFolderId,
                    father: null,
                    title: 'Le mie note',
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
                }))
            ];
            for (let item of itemsList) {
                if (item.type == 'folder') {
                    item.children = [];
                } else {
                    item.saved = 2;
                }
            }
            console.log(itemsList);
            this.items = itemsList;
            this.root.length = 0;
            for (let [id, item] of this.itemsMap) {
                if (item.father != null) {
                    let father = this.itemsMap.get(item.father);
                    father.children.push(item);
                } else {
                    this.root.push(item);
                }
            }
        },
        async move(target, destination) {
            if (target == destination) return;
            if (destination.children.includes(target)) return;
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
            }
            try {
                let response = await http.post(type == 'folder' ? API_FOLDERS_URL : API_NOTES_URL, {
                    name: obj.title,
                    parent: this.rootFolderId
                });
                obj.id = response.data._id;
                obj.content = JSON.parse(response.data.content);
                console.log(obj);
            } catch (error) {
                console.error(error);
                return;
            }
            this.items.push(obj);
            this.itemsMap.get(this.rootFolderId).children.push(obj);
        }
    }
});