<template>
  <quill-editor ref="editor" @textChange="accumulate" toolbar="full" :contentType="contentType" :content="content" :readOnly="readOnly" :options="options" />
</template>

<script>
  import { QuillEditor, Delta } from "@vueup/vue-quill";
  import "@vueup/vue-quill/dist/vue-quill.snow.css";
  export default {
      name: "Editor",
      components: {
          QuillEditor
      },
      props: {
        contentType: {
          type: String,
          default: "text"
        },
        content: Delta | String,
        readOnly: {
          type: Boolean,
          default: false
        },
        autoSaving: {
          type: Boolean,
          default: false
        },
        options: Object
      },
      emits: ["autoSave"],
      data() {
        return {
          changes: new Delta(),
          timer: null,
        }
      },
      methods: {
        accumulate: function (change) { //Concatena le modifiche che avvengono nell'editor e, se richiesto, lancia l'evento per l'autosalvataggio
          this.changes = this.changes.compose(change.delta)
          if (this.autoSaving) { //Autosalvataggio
            if (this.timer != null) {
              window.clearTimeout(this.timer)
            }
            let temp = {
              emit: this.$emit,
              deleteChanges: this.deleteChanges,
              changes: this.changes
            };
            this.timer = window.setTimeout(function (){
              temp.emit("autoSave",temp.changes)
              temp.deleteChanges()
            },2000)
          }
        },
        getContents() {
          return this.$refs.editor.getContents()
        },
        setContents(content) {
          this.$refs.editor.setContents(content)
        },
        getChanges() {
          return this.changes
        },
        deleteChanges() {
          this.changes = new Delta()
        }
      },
      computed: {
        
      }
  }
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