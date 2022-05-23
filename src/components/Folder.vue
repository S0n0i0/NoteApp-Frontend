<template>
	<div class="pl-4" :class="{ 'pr-2': this.item.id == -1 }">
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
			"
			:class="{
				'hover:bg-quaternary hover:text-primary bg-quaternary text-primary':
					dragging ||
					dragenter ||
					store.contextMenu.target == item ||
					store.editingTarget == item,
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
					'rotate-180': open || (item.id == -1 && store.openRoot),
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
				class="mx-1"
				:class="{ 'pointer-events-none': store.editingTarget != item }"
			>
				<input
					ref="input"
					class="bg-transparent block"
					v-model="item.title"
					@keypress="enterListener"
				/>
			</div>
		</div>
		<div v-show="open || (item.id == -1 && store.openRoot)">
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
		changeOpen() {
			this.open = !this.open;
			this.store.openRoot = false;
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
		dragEnterEvent() {
			if (this.item.type == "folder") {
				//console.log("enter" + this.item.title);
				let [target, destination] = [
					this.store.draggedElement,
					this.item,
				];
				if (destination.children.includes(target)) return;
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
				//console.log("leave" + this.item.title);
				this.dragenter = false;
			}
		},
		dropEvent() {
			if (this.item.type == "folder") {
				this.dragenter = false;
				this.store.move(this.store.draggedElement, this.item);
			}
		},
		menuEvent(event) {
			if (this.item.id == -1) return;
			let menu = this.store.contextMenu;
			menu.x = event.clientX;
			menu.y = event.clientY;
			menu.show = true;
			menu.target = this.item;
			this.store.editingTargetElement = this.$refs.input;
		},
		enterListener(event) {
			if (event.key == "Enter") {
				this.store.editingTargetElement.blur();
				this.store.editingTargetElement = null;
				this.store.editingTarget = null;
			}
		},
	},
};
</script>