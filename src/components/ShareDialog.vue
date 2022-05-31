<template>
	<div
		class="
			top-0
			left-0
			min-w-[100vw] min-h-[100vh]
			w-[100vw]
			h-[100vh]
			bg-transparent
			flex
			justify-center
			items-center
			p-0
			absolute
			z-10
		"
		:class="{ flex: open, hidden: !open }"
	>
		<div
			class="
				w-full
				h-full
				absolute
				-z-10
				bg-tertiary bg-opacity-30
				blur-lg
			"
		></div>
		<div
			class="
				min-w-[150px] min-h-[200px]
				p-4
				bg-primary
				text-neutral
				flex flex-col
				items-center
				rounded-lg
			"
		>
			<div v-show="mode == 'get'">
				<p class="text-secondary font-medium mt-4">
					Codice di condivisione:
				</p>
				<p class="mt-2 select-text">
					{{ user.decode()._id }}/{{ store.selectedNote.id }}
				</p>
				<p class="text-secondary font-medium mt-4">Stato della nota:</p>
				<div class="flex mt-2">
					<label class="text-neutral text-1s mt-1">{{
						shared ? "Pubblica" : "Privata"
					}}</label>
					<label class="switch mt-1 ml-2">
						<input v-model="shared" type="checkbox" />
						<span class="slider round"></span>
					</label>
				</div>
			</div>
			<div v-show="mode == 'import'">
				<label for="share-link" class="text-secondary font-medium mt-8"
					>Inserisci codice di condivisione:</label
				>
				<input
					id="share-link"
					v-model="code"
					type="text"
					class="
						bg-tertiary
						text-0x
						font-normal
						px-4
						py-2
						rounded-md
						block
						mt-2
					"
				/>
			</div>
			<button
				class="bg-secondary font-medium rounded-md px-4 py-2 mt-12"
				@click="closeDialog"
			>
				{{ mode == "get" ? "Chiudi" : "Importa" }}
			</button>
		</div>
	</div>
</template>

<script>
import { useFoldersStore } from "@/stores/foldersStore";
import { useUserStore } from "@/stores/userStore";
import {
	API_SHARE_PUBLIC,
	API_SHARE_PRIVATE,
	API_SHARED_NOTES,
} from "../../config";
import http from "@/assets/scripts/axios-config";

export default {
	name: "ShareDialog",
	props: {
		open: Boolean,
		mode: String, //import, get
	},
	data() {
		return {
			store: useFoldersStore(),
			user: useUserStore(),
			shared: false,
			code: "",
		};
	},
	computed: {
		hostname() {
			return window.location.hostname;
		},
	},
	watch: {
		open(newValue, oldValue) {
			if (newValue && !oldValue) {
				this.shared = this.store.selectedNote.shared;
			}
		},
		shared(newValue, oldValue) {
			if (newValue != oldValue) {
				try {
					http.post(
						`${
							this.shared ? API_SHARE_PUBLIC : API_SHARE_PRIVATE
						}/${this.store.selectedNote.id}`
					);
				} catch (error) {
					console.error(error);
					this.shared = oldValue;
					return;
				}
				this.store.selectedNote.shared = newValue;
			}
		},
	},
	methods: {
		async closeDialog() {
			this.$emit("close");
			if (this.mode == "get") return;
			let response;
			try {
				response = await http.get(
					`${API_SHARED_NOTES}/share/${this.code}`
				);
			} catch (error) {
				console.error(error);
				return;
			}
			let sharedFolderId = this.store.sharedFolderId;
			let obj = {
				id: response.data._id,
				title: response.data.name,
				father: sharedFolderId,
				content: response.data.content,
				type: "note",
				shared: response.data.shared,
			};
			this.store.items.push(obj);
			this.useFoldersStore.itemsMap
				.get(sharedFolderId)
				.children.push(obj);
		},
	},
};
</script>