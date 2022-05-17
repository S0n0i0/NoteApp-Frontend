<template>
  <quill-editor theme="snow" toolbar="full" />
</template>

<script>
  import { QuillEditor } from "@vueup/vue-quill";
  import "@vueup/vue-quill/dist/vue-quill.snow.css";
  export default {
      components: {
          QuillEditor
      }
  }
</script>

<style>

</style>