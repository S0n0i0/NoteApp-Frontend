<template>
	<div class="w-full h-full">
		<p class="px-3 pb-1 pt-4">Ricerca per titolo:</p>
		<div class="p-2 max-w-full relative">
			<input
				@input="inputListener"
				type="text"
				v-model="searchQuery"
				class="
					bg-tertiary
					rounded-lg
					max-w-full
					w-full
					h-[30px]
					pl-2
					pr-8
					py-1
					text-neutral
				"
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				class="
					stroke-quaternary
					absolute
					top-1/2
					right-3
					-translate-y-1/2
					cursor-pointer
				"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				@click="searchQuery = ''"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</div>
		<div
			v-for="result in results"
			:key="result.id"
			class="px-3 py-2 overflow-hidden whitespace-nowrap cursor-pointer"
			@click="changeOpen(result)"
		>
			<p>{{ result.title }}</p>
		</div>
	</div>
</template>

<script>
import { useFoldersStore } from "@/stores/foldersStore";

export default {
	name: "Search",
	data() {
		return {
			searchQuery: "",
			store: useFoldersStore(),
			timeoutId: null,
			results: [],
		};
	},
	methods: {
		search() {
			let query = this.searchQuery;
			this.results = this.store.fuse
				.search({
					$and: [{ title: query }, { type: "=note" }],
				})
				.map((x) => x.item);
		},
		inputListener() {
			if (this.timeoutId) clearTimeout(this.timeoutId);
			this.timeoutId = setTimeout(this.search, 500);
		},
		changeOpen(item) {
			if (item.saved != 0) item.saved = 2;
			this.store.selectedNote = item;
			this.store.quillRef.setContents(item.content);
		},
	},
};
</script>