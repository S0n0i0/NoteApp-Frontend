<template>
	<div class="flex h-full w-full" @click="outsideClick">
		<!-- start navbar -->
		<div
			class="
				w-[50px]
				h-full
				flex flex-col
				bg-primary
				items-center
				justify-between
			"
		>
			<div class="flex flex-col">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="25"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					class="cursor-pointer my-4 hover:stroke-secondary"
					:class="
						activeBar == 'folders'
							? 'stroke-secondary'
							: 'stroke-quaternary'
					"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					@click="
						activeBar = activeBar != 'folders' ? 'folders' : 'none'
					"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path
						d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"
					/>
					<path
						d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="25"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					class="cursor-pointer my-4 hover:stroke-secondary"
					:class="
						activeBar == 'search'
							? 'stroke-secondary'
							: 'stroke-quaternary'
					"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					@click="
						activeBar = activeBar != 'search' ? 'search' : 'none'
					"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<circle cx="10" cy="10" r="7" />
					<line x1="21" y1="21" x2="15" y2="15" />
				</svg>
			</div>
			<div class="flex flex-col">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="25"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					class="stroke-quaternary cursor-pointer my-4"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<circle cx="12" cy="7" r="4" />
					<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="25"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					class="stroke-quaternary cursor-pointer my-4"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path
						d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
					/>
					<circle cx="12" cy="12" r="3" />
				</svg>
				<svg
					@click="logout"
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="25"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					class="stroke-quaternary cursor-pointer my-4"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path
						d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
					/>
					<path d="M20 12h-13l3 -3m0 6l-3 -3" />
				</svg>
			</div>
		</div>
		<!-- end navbar -->
		<!-- start activebar -->
		<div
			class="h-full w-[200px] bg-secondary activebar touch-none"
			v-show="activeBar != 'none'"
		>
			<folders v-show="activeBar == 'folders'" />
			<search v-show="activeBar == 'search'" />
		</div>
		<!-- end activebar -->
		<share-dialog
			:open="store.showShareDialog"
			:mode="store.shareDialogMode"
			@close="store.showShareDialog = false"
		/>
		<!-- start editor -->
		<div
			class="flex-1 flex-col"
			:class="{
				hidden: !store.selectedNote.id,
				flex: store.selectedNote.id,
			}"
		>
			<!-- start titlebar -->
			<div class="h-[50px] bg-primary flex items-center">
				<input
					type="text"
					class="flex-1 bg-primary text-secondary font-medium ml-4"
					:disabled="
						store.selectedNote.father == store.sharedFolderId
					"
					v-model="store.selectedNote.title"
					@blur="saveTitleChange"
				/>
				<div
					:class="{
						flex: store.selectedNote.father != store.sharedFolderId,
						hidden:
							store.selectedNote.father == store.sharedFolderId,
					}"
				>
					<label class="text-neutral text-1s mt-1"
						>Salvataggio automatico</label
					>
					<label class="switch mt-1 ml-2">
						<input
							v-model="editor.autoSaving"
							type="checkbox"
							@click="editor.autoSaving = !editor.autoSaving"
						/>
						<span class="slider round"></span>
					</label>
				</div>
				<svg
					v-show="store.selectedNote.father != store.sharedFolderId"
					@click="openShareDialog('get')"
					xmlns="http://www.w3.org/2000/svg"
					class="
						stroke-neutral
						ml-4
						cursor-pointer
						min-w-[20px] min-h-[20px]
					"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<circle cx="6" cy="12" r="3" />
					<circle cx="18" cy="6" r="3" />
					<circle cx="18" cy="18" r="3" />
					<line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
					<line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
				</svg>
				<svg
					v-show="store.selectedNote.father != store.sharedFolderId"
					xmlns="http://www.w3.org/2000/svg"
					class="
						stroke-neutral
						ml-4
						cursor-pointer
						min-w-[20px] min-h-[20px]
					"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="#ffffff"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					@click="save"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path
						d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"
					/>
					<circle cx="12" cy="14" r="2" />
					<polyline points="14 4 14 8 8 8 8 4" />
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="
						icon icon-tabler icon-tabler-file-export
						cursor-pointer
						ml-4
					"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="#ffffff"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					@click="showExport"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M14 3v4a1 1 0 0 0 1 1h4" />
					<path
						d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"
					/>
				</svg>
				<svg
					v-show="store.selectedNote.father != store.sharedFolderId"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					stroke-width="2"
					class="
						stroke-neutral
						ml-4
						cursor-pointer
						min-w-[20px] min-h-[20px]
					"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path
						d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					stroke-width="2"
					class="
						stroke-neutral
						mx-4
						cursor-pointer
						min-w-[20px] min-h-[20px]
					"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<circle cx="12" cy="12" r="1" />
					<circle cx="12" cy="19" r="1" />
					<circle cx="12" cy="5" r="1" />
				</svg>
			</div>
			<!-- end titlebar -->
			<div
				class="editor-container flex flex-col"
				:class="{
					'pointer-events-none':
						store.selectedNote.father == store.sharedFolderId,
				}"
			>
				<editor
					ref="editor"
					@autoSave="save"
					:contentType="editor.contentType"
					:content="store.selectedNote.content"
					:readOnly="editor.readOnly"
					:autoSaving="editor.autoSaving"
					:options="editor.options"
				/>
			</div>
			<export-dialog
				ref="toExport"
				@exportNote="exportNote"
				:open="toExport.show"
			/>
			<custom-dialog
				@close="error.show = false"
				:open="error.show"
				:error="error.description"
			/>
		</div>
		<!-- end editor -->
	</div>
</template>

<script>
import http from "@/assets/scripts/axios-config";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import Editor from "@/components/Editor.vue";
import CustomDialog from "@/components/CustomDialog.vue";
import Folders from "@/components/Folders.vue";
import ShareDialog from "@/components/ShareDialog.vue";
import ExportDialog from "@/components/ExportDialog.vue";
import Search from "@/components/Search.vue";
import interact from "interactjs";
import { useUserStore } from "@/stores/userStore";
import { Delta } from "@vueup/vue-quill";
import {
	API_SAVE_URL,
	API_LOAD_URL,
	API_NOTES_URL,
	API_FOLDERS_URL,
} from "../../config";
import { useFoldersStore } from "@/stores/foldersStore";
import { saveAs } from "file-saver";
import { pdfExporter } from "quill-to-pdf";
import { deltaToMarkdown } from "quill-delta-to-markdown";

export default {
	name: "Home",
	components: {
		Editor,
		CustomDialog,
		Folders,
		ExportDialog,
		ShareDialog,
		Search,
	},
	data() {
		return {
			store: useFoldersStore(),
			note: {
				//note data
				id: "",
				content: "",
				title: "",
				father: "",
				type: "",
			},
			activeBar: "none", //none, folders, search, user, options
			error: {
				show: false,
				description: "",
			},
			toExport: {
				show: false,
			},
			editor: {
				//Editor data
				contentType: "delta",
				content: {},
				readOnly: false,
				autoSaving: false,
				options: {
					bounds: document.getElementById("editorContainer"),
				},
			},
		};
	},
	mounted() {
		this.store.quillRef = this.$refs.editor;
		// initialize resizable activebar
		interact(".activebar").resizable({
			edges: {
				right: true,
			},
			listeners: {
				move: function (event) {
					let { x, y } = event.target.dataset;
					x = (parseFloat(x) || 0) + event.deltaRect.left;
					y = (parseFloat(y) || 0) + event.deltaRect.top;

					Object.assign(event.target.style, {
						width: `${event.rect.width}px`,
						height: `${event.rect.height}px`,
						transform: `translate(${x}px, ${y}px)`,
					});

					Object.assign(event.target.dataset, { x, y });
				},
			},
			modifiers: [
				interact.modifiers.restrictSize({
					min: { width: 200 },
					max: { width: 400 },
				}),
			],
		});
	},
	methods: {
		showError(description) {
			this.error.description = description;
			this.error.show = true;
			this.editor.autoSaving = false;
		},
		showExport() {
			console.log(this.$refs.toExport);
			this.$refs.toExport.setName(this.store.selectedNote.title);
			this.toExport.show = true;
		},
		save(changes) {
			//Send a save request to the database to save the note
			if (!(changes instanceof Delta)) {
				changes = this.$refs.editor.getChanges();
				this.$refs.editor.deleteChanges();
				console.log("Salvataggio manuale");
			} else {
				console.log("Salvataggio automatico");
			}
			let target = this.store.selectedNote;
			target.saved = true;
			http.put(API_SAVE_URL + "/" + target.id, {
				newfather: target.title,
				newcontent: changes.ops,
				newname: target.title,
			})
				.then((response) => {
					console.log("File salvato");
				})
				.catch((err) => {
					if (err.status == 400) {
						console.error("Input invalido");
					} else if (err.status == 403) {
						console.error("Utente non autenticato");
						this.$router.push("/login");
					} else if (err.status == 500) {
						console.error("Errore del server");
					} else {
						console.error(
							"Errore generico: ",
							err.status,
							"-",
							err.code
						);
					}
					this.showError("Errore: File non salvato");
					console.error("File non salvato");
				});
		},
		load(id) {
			http.get(API_LOAD_URL + "/" + this.note.id)
				.then((res) => {
					this.note.title = res.data.name;
					this.$refs.editor.setContents(JSON.parse(res.data.content));
					//Aggiungere created e update
					console.log("File caricato");
				})
				.catch((err) => {
					if (err.status == 400) {
						console.error("Input invalido");
					} else if (err.status == 403) {
						console.error("Utente non autenticato");
						this.$router.push("/login");
					} else if (err.status == 500) {
						console.error("Errore del server");
					} else {
						console.error(
							"Errore generico: ",
							err.status,
							"-",
							err.code
						);
					}
					this.showError("Errore: File non caricato");
					console.error("File non caricato");
				});
		},
		logout() {
			localStorage.clear();
			useUserStore().authToken = "";
			this.$router.push({ name: "login" });
		},
		async saveTitleChange() {
			let target = this.store.selectedNote;
			console.log(target);
			let data = {
				newname: target.title,
				newparent: target.father,
				newcontent: target.content,
			};
			try {
				await http.put(`${API_NOTES_URL}/${target.id}`, data);
			} catch (error) {
				console.error(error);
			}
			this.store.updateFuse();
		},
		async outsideClick() {
			this.store.closeMenu();
			if (this.store.editingTarget) {
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
		openShareDialog(mode) {
			this.store.showShareDialog = true;
			this.store.shareDialogMode = mode;
		},
		async exportNote(fileName) {
			let fileBlob;
			let content = this.$refs.editor.getContents();
			if (fileName.type === "pdf") {
				fileBlob = await pdfExporter.generatePdf(content); //Converts to pdf
			} else if (fileName.type === "md") {
				fileBlob = new Blob([deltaToMarkdown(content.ops)], {
					type: "text/markdown",
				}); //Converts to Markdown
			}
			saveAs(fileBlob, fileName.name + "." + fileName.type); //Downloads from the browser
			this.toExport.show = false;
		},
	},
};
</script>

<style>
.switch {
	position: relative;
	display: inline-block;
	width: 34px;
	height: 16px;
}

/* Hide default HTML checkbox */
.switch input {
	opacity: 0;
	width: 0;
	height: 0;
}

.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

.slider:before {
	position: absolute;
	content: "";
	height: 13px;
	width: 13px;
	left: 2px;
	bottom: 1px;
	background-color: white;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

input:checked + .slider {
	background-color: var(--color-secondary);
}

input:focus + .slider {
	box-shadow: 0 0 1px var(--color-secondary);
}

input:checked + .slider:before {
	-webkit-transform: translateX(18px);
	-ms-transform: translateX(18px);
	transform: translateX(18px);
}

/* Rounded sliders */
.slider.round {
	border-radius: 34px;
}

.slider.round:before {
	border-radius: 50%;
}
</style>
