<template>
	<div class="pl-4" :class="{ 'pr-2': this.item.id == store.rootFolderId }">
		<div
			class="
				flex
				py-1
				px-2
				items-center
				cursor-pointer
				rounded-md
				group
				hover:bg-primary hover:text-neutral
				overflow-hidden
				whitespace-nowrap
				w-full
			"
			:class="{
				'hover:bg-quaternary hover:text-primary bg-quaternary text-primary':
					dragging ||
					dragenter ||
					store.contextMenu.target == item ||
					store.editingTarget == item,
				'bg-primary text-neutral': store.selectedNote == item,
			}"
			draggable="true"
			@click="changeOpen"
			@dragstart="dragStartEvent"
			@dragend="dragEndEvent"
			@dragenter="dragEnterEvent"
			@dragleave="dragLeaveEvent"
			@dragover.prevent
			@drop="dropEvent"
			@contextmenu.prevent="menuEvent"
		>
			<svg
				v-if="item.type == 'folder'"
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="15"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				class="
					min-h-[15px] min-w-[15px]
					stroke-primary
					fill-primary
					rotate-90
					group-hover:stroke-neutral group-hover:fill-neutral
					pointer-events-none
				"
				:class="{
					'rotate-180':
						open ||
						(item.id == store.rootFolderId && store.openRoot),
					'group-hover:stroke-primary group-hover:fill-primary stroke-primary fill-primary':
						dragging ||
						dragenter ||
						store.contextMenu.target == item ||
						store.editingTarget == item,
				}"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path
					d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"
				/>
			</svg>
			<div
				class="mx-1 max-w-full overflow-hidden"
				:class="{ 'pointer-events-none': store.editingTarget != item }"
			>
				<input
					ref="input"
					class="bg-transparent block"
					:style="{ width: `${item.title.length + 1}ch` }"
					v-model="item.title"
					@keypress="enterListener"
				/>
			</div>
			<svg
				v-if="item.type == 'note'"
				v-show="item.saved == 0"
				xmlns="http://www.w3.org/2000/svg"
				width="14"
				height="14"
				viewBox="0 0 24 24"
				stroke-width="0"
				class="
					fill-primary
					min-w-[14px] min-h-[14px]
					group-hover:fill-neutral
				"
				:class="{
					'group-hover:fill-primary fill-primary':
						dragging ||
						store.contextMenu.target == item ||
						store.editingTarget == item,
					'fill-neutral':
						store.selectedNote == item &&
						!(
							store.contextMenu.target == item ||
							store.editingTarget == item
						),
				}"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<circle cx="12" cy="12" r="9" />
			</svg>
			<svg
				v-if="item.type == 'note'"
				v-show="item.favorite"
				xmlns="http://www.w3.org/2000/svg"
				width="14"
				height="14"
				viewBox="0 0 24 24"
				stroke-width="0"
				class="
					fill-primary
					min-w-[14px] min-h-[14px]
					group-hover:fill-neutral
					ml-2
				"
				:class="{
					'group-hover:fill-primary fill-primary':
						dragging ||
						store.contextMenu.target == item ||
						store.editingTarget == item,
					'fill-neutral':
						store.selectedNote == item &&
						!(
							store.contextMenu.target == item ||
							store.editingTarget == item
						),
				}"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path
					d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
				/>
			</svg>
		</div>
		<div v-show="open || (item.id == store.rootFolderId && store.openRoot)">
			<folder
				v-for="child of item.children || []"
				:key="child.id"
				:item="child"
			/>
		</div>
	</div>
</template>

<script>
import { useFoldersStore } from "@/stores/foldersStore";
import http from "@/assets/scripts/axios-config";
import { API_NOTES_URL, API_FOLDERS_URL } from "../../config";

export default {
	name: "Folder",
	props: {
		item: Object,
	},
	data() {
		return {
			open: false,
			dragging: false,
			dragenter: false,
			store: useFoldersStore(),
		};
	},
	methods: {
		// if you click a folder you "open" it
		// if you click a note you select and open it
		async changeOpen() {
			if (this.item.type == "folder") {
				this.open = !this.open;
				this.store.openRoot = false;
			} else {
				await this.store.changeSelectedNote(this.item);
			}
		},
		dragStartEvent() {
			this.dragging = true;
			this.store.draggedElement = this.item;
			this.store.closeMenu();
		},
		dragEndEvent() {
			this.dragging = false;
			this.store.draggedElement = null;
		},
		// highlight the drop location if it is a folder and you enter on it while dragging
		dragEnterEvent() {
			if (this.item.type == "folder") {
				let [target, destination] = [
					this.store.draggedElement,
					this.item,
				];
				if (destination.children.includes(target)) return;
				if (destination.id == this.store.sharedFolderId) return;
				if (target.father == this.store.sharedFolderId) return;
				let temp = destination.father;
				while (temp != null) {
					if (temp == target.id) return;
					temp = this.store.itemsMap.get(temp).father;
				}
				this.dragenter = true;
			}
		},
		dragLeaveEvent() {
			if (this.item.type == "folder") {
				this.dragenter = false;
			}
		},
		// move the dragged element to the drop location
		dropEvent() {
			if (this.item.type == "folder") {
				this.dragenter = false;
				this.store.move(this.store.draggedElement, this.item);
			}
		},
		// open the custom contextmenu
		menuEvent(event) {
			if (this.item.id == this.store.rootFolderId) return;
			if (this.item.id == this.store.sharedFolderId) return;
			if (this.item.father == this.store.sharedFolderId) return;
			let menu = this.store.contextMenu;
			menu.x = event.clientX;
			menu.y = event.clientY;
			menu.show = true;
			menu.target = this.item;
			this.store.editingTargetElement = this.$refs.input;
		},
		// save the changes to the title when you type "enter"
		async enterListener(event) {
			if (event.key == "Enter") {
				let target = this.store.editingTarget;
				this.store.editingTargetElement.blur();
				this.store.editingTargetElement = null;
				this.store.editingTarget = null;
				try {
					let data = {
						newname: target.title,
						newparent: target.father,
					};
					if (target.type == "note") data.newcontent = target.content;
					await http.put(
						`${
							target.type == "folder"
								? API_FOLDERS_URL
								: API_NOTES_URL
						}/${target.id}`,
						data
					);
				} catch (error) {
					console.error(error);
				}
				this.store.updateFuse();
			}
		},
	},
};
</script>