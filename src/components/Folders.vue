<template>
	<div class="w-full h-full overflow-hidden">
		<folder-context-menu />
		<div class="w-full flex justify-end items-center py-3 px-1">
			<svg
				@click="openShareDialog('import')"
				xmlns="http://www.w3.org/2000/svg"
				width="25"
				height="25"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				class="stroke-primary cursor-pointer"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M4 21v-4a3 3 0 0 1 3 -3h5" />
				<path d="M9 17l3 -3l-3 -3" />
				<path d="M14 3v4a1 1 0 0 0 1 1h4" />
				<path
					d="M5 11v-6a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-9.5"
				/>
			</svg>
			<svg
				@click="addNote"
				xmlns="http://www.w3.org/2000/svg"
				width="25"
				height="25"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				class="stroke-primary cursor-pointer ml-2"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M14 3v4a1 1 0 0 0 1 1h4" />
				<path
					d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
				/>
				<line x1="12" y1="11" x2="12" y2="17" />
				<line x1="9" y1="14" x2="15" y2="14" />
			</svg>
			<svg
				@click="addFolder"
				xmlns="http://www.w3.org/2000/svg"
				width="25"
				height="25"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				class="stroke-primary cursor-pointer ml-2"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path
					d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2"
				/>
				<line x1="12" y1="10" x2="12" y2="16" />
				<line x1="9" y1="13" x2="15" y2="13" />
			</svg>
		</div>
		<folder v-for="item in store.root" :key="item.id" :item="item" />
	</div>
</template>

<script>
import Folder from "@/components/Folder.vue";
import FolderContextMenu from "@/components/FolderContextMenu.vue";
import { useFoldersStore } from "@/stores/foldersStore";

export default {
	name: "Folders",
	components: {
		Folder,
		FolderContextMenu,
	},
	data() {
		return {
			store: useFoldersStore(),
		};
	},
	methods: {
		async addItem(type) {
			await this.store.addItem(type);
			this.store.openRoot = true;
		},
		async addNote() {
			await this.addItem("note");
		},
		async addFolder() {
			await this.addItem("folder");
		},
		openShareDialog(mode) {
			this.store.showShareDialog = true;
			this.store.shareDialogMode = mode;
		},
	},
	async created() {
		await this.store.init();
	},
};
</script>