import { defineStore } from 'pinia';

export const useFoldersStore = defineStore('folders', {
    state: () => {
        return {
            draggedElement: null,
            items: [],
            root: [],
            contextMenu: {
                x: 0,
                y: 0,
                show: false,
                target: null,
            },
            editingTarget: null,
            editingTargetElement: null,
            openRoot: false,
        };
    },
    getters: {
        itemsMap: (state) => {
            return new Map(state.items.map((x) => [x.id, x]));
        },
    },
    actions: {
        init() {
            //fetch from API
            this.items = [
                {
                    id: -1,
                    father: null,
                    title: 'Le mie note',
                    type: 'folder',
                },
                {
                    id: 1,
                    father: -1,
                    title: "Paradiso",
                    type: "folder",
                },
                {
                    id: 2,
                    father: -1,
                    title: "Purgatorio",
                    type: "folder",
                },
                {
                    id: 3,
                    father: -1,
                    title: "Inferno",
                    type: "folder",
                },
                {
                    id: 4,
                    father: 3,
                    title: "Inferno - Canto V",
                    type: "note",
                },
                {
                    id: 5,
                    father: 3,
                    title: "Inferno - Canto IV",
                    type: "note",
                },
                {
                    id: 6,
                    father: 3,
                    title: "Inferno - Canto X",
                    type: "note",
                },
                {
                    id: 7,
                    father: 3,
                    title: "Test",
                    type: "folder",
                },
                {
                    id: 8,
                    father: 7,
                    title: "Prova",
                    type: "note",
                },
                {
                    id: 9,
                    father: 2,
                    title: "Purgatorio - Canto 1",
                    type: "note",
                },
                {
                    id: 10,
                    father: 3,
                    title: "Test 2",
                    type: "folder",
                }
            ]
            this.root.length = 0;
            for (let [id, item] of this.itemsMap) {
                if (!item.children && item.type == "folder") item.children = [];
                if (item.father != null) {
                    let father = this.itemsMap.get(item.father);
                    if (!father.children) father.children = [];
                    father.children.push(item);
                } else {
                    this.root.push(item);
                }
            }
        },
        move(target, destination) {
            if (target == destination) return;
            if (destination.children.includes(target)) return;
            let temp = destination.father;
            while (temp != null) {
                if (temp == target.id) return;
                temp = this.itemsMap.get(temp).father;
            }
            let father = this.itemsMap.get(target.father);
            this.draggedElement = null;
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
        delete(target) {
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
        addItem(type) {
            let id;
            do {
                id = Math.floor(Math.random() * 1000);
            } while (this.itemsMap.has(id));
            let obj = {
                id,
                father: -1,
                title: `${type == 'folder' ? 'Cartella' : 'Nota'} #${id}`,
                type,
            }
            if (type == 'folder') obj.children = [];
            this.items.push(obj);
            this.itemsMap.get(-1).children.push(obj);
        }
    }
});