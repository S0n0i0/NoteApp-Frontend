<template>
	<div class="px-4">
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
					dragging || dragenter,
			}"
			draggable="true"
			@click="open = !open"
			@dragstart="dragStartEvent"
			@dragend="dragEndEvent"
			@dragenter="dragEnterEvent"
			@dragleave="dragLeaveEvent"
			@dragover.prevent
			@drop="dropEvent"
		>
			<svg
				v-if="item.type == 'folder'"
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="15"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				class="
					stroke-primary
					fill-primary
					rotate-90
					group-hover:stroke-neutral group-hover:fill-neutral
					pointer-events-none
				"
				:class="{
					'rotate-180': open,
					'group-hover:stroke-primary group-hover:fill-primary stroke-primary fill-primary':
						dragging || dragenter,
				}"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path
					d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"
				/>
			</svg>
			<p class="ml-1 pointer-events-none">
				{{ item.title }}
			</p>
		</div>
		<div v-show="open">
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
		dragStartEvent() {
			this.dragging = true;
			this.store.draggedElement = this.item;
		},
		dragEndEvent() {
			this.dragging = false;
			this.store.draggedElement = null;
			this.$forceUpdate();
			console.log("End");
		},
		dragEnterEvent() {
			if (this.item.type == "folder") {
				//console.log("enter" + this.item.title);
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
	},
};
</script>