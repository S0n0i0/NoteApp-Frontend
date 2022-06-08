<template>
	<quill-editor
		ref="editor"
		@textChange="accumulate"
		toolbar="full"
		:contentType="contentType"
		:content="content"
		:readOnly="readOnly"
		:options="options"
		v-model:content="store.selectedNote.content"
	/>
</template>

<script>
import { QuillEditor, Delta, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { useFoldersStore } from "@/stores/foldersStore";
import QuillCursors from "quill-cursors";

export default {
	name: "Editor",
	components: {
		QuillEditor,
	},
	props: {
		contentType: {
			type: String,
			default: "text",
		},
		content: Delta | String,
		readOnly: {
			type: Boolean,
			default: false,
		},
		autoSaving: {
			type: Boolean,
			default: false,
		},
		options: Object,
	},
	emits: ["autoSave"],
	data() {
		return {
			changes: new Delta(),
			timer: null,
			store: useFoldersStore(),
			emptyVar: "",
		};
	},
	computed: {
		vmodelVar: {
			get() {
				if (this.isShared) {
					return this.emptyVar;
				} else {
					return this.store.selectedNote.content;
				}
			},
			set(value) {
				if (this.isShared) {
					this.emptyVar = value;
				} else {
					this.store.selectedNote.content = value;
				}
			},
		},
		isShared() {
			return (
				this.store.selectedNote.father == this.store.sharedFolderId ||
				this.store.selectedNote.shared
			);
		},
	},
	methods: {
		accumulate: function (change) {
			//Concatena le modifiche che avvengono nell'editor e, se richiesto, lancia l'evento per l'autosalvataggio
			this.changes = this.changes.compose(change.delta);
			if (this.autoSaving) {
				//Autosalvataggio
				if (this.timer != null) {
					window.clearTimeout(this.timer);
				}
				let temp = {
					emit: this.$emit,
					deleteChanges: this.deleteChanges,
					changes: this.changes,
				};
				this.timer = window.setTimeout(function () {
					temp.emit("autoSave", temp.changes);
					temp.deleteChanges();
				}, 2000);
			} else {
				if (this.store.selectedNote.saved != 0)
					this.store.selectedNote.saved--;
			}
			if (
				this.store.selectedNote.father == this.store.sharedFolderId ||
				this.store.selectedNote.shared
			)
				this.store.sendUpdate(change);
		},
		getContents() {
			return this.$refs.editor.getContents();
		},
		setContents(content) {
			this.$refs.editor.setContents(content);
		},
		getChanges() {
			return this.changes;
		},
		deleteChanges() {
			this.changes = new Delta();
		},
		getQuill() {
			return this.$refs.editor.getQuill();
		},
	},
	mounted() {
		Quill.register("modules/cursors", QuillCursors);
	},
};
</script>

<style>
.ql-container {
	height: auto;
	flex-grow: 1;
	overflow: hidden;
}

.ql-editor {
	overflow: auto;
}
</style>