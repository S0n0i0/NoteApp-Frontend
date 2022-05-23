<template>
	<div
		v-show="store.contextMenu.show"
		class="fixed top-0 left-0 bg-tertiary text-neutral rounded-md p-3 z-30"
		:style="{
			transform: `translate(${store.contextMenu.x}px, ${store.contextMenu.y}px)`,
		}"
		@click.stop=""
	>
		<div
			class="flex items-center py-1 cursor-pointer group"
			@click="rinomina"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				class="stroke-neutral group-hover:stroke-secondary"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
				<line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
			</svg>
			<p class="ml-3 group-hover:text-secondary">Rinomina</p>
		</div>
		<div
			class="flex items-center py-1 cursor-pointer group"
			@click="elimina"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				class="stroke-neutral group-hover:stroke-secondary"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<line x1="4" y1="7" x2="20" y2="7" />
				<line x1="10" y1="11" x2="10" y2="17" />
				<line x1="14" y1="11" x2="14" y2="17" />
				<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
				<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
			</svg>
			<p class="ml-3 group-hover:text-secondary">Elimina</p>
		</div>
	</div>
</template>

<script>
import { useFoldersStore } from "@/stores/foldersStore";

export default {
	name: "FolderContextMenu",
	data() {
		return {
			store: useFoldersStore(),
		};
	},
	methods: {
		rinomina() {
			this.store.editingTarget = this.store.contextMenu.target;
			this.store.closeMenu();
			this.store.editingTargetElement.focus();
		},
		elimina() {
			this.store.delete(this.store.contextMenu.target);
			this.store.closeMenu();
		},
	},
};
</script>