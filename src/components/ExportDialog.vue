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
        min-w-[150px] min-h-[300px]
        w-1/3
        p-4
        bg-primary
        text-neutral
        flex flex-col
        items-center
        rounded-lg
      "
    >
      <label class="text-lg mb-5">Esporta documento</label>
      <div class="w-full flex mb-3">
        <input
          ref="name"
          type="text"
          v-model="name"
          class="w-full text-primary"
        />
        <label class="ml-2">.{{ type }}</label>
      </div>
      <div class="w-full flex">
        <label class="mr-2">Tipo di file:</label>
        <select ref="type" v-model="type" class="text-primary">
          <option value="pdf">pdf</option>
        </select>
      </div>
      <button
        class="
          bg-secondary
          font-medium
          self-center
          py-2
          px-6
          mt-6
          w-fit
          rounded-md
        "
        @click="$emit('exportNote', name + '.' + type)"
      >
        Esporta
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExportDialog",
  props: {
    open: Boolean,
  },
  emits: ["exportNote"],
  data() {
    return {
      name: "",
      type: "pdf",
    };
  },
  methods: {
    setName(name) {
      this.name = name;
    },
  },
};
</script>