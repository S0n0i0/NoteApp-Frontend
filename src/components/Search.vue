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
		<div class="mb-3 flex flex-wrap">
			<div class="flex px-3">
				<input
					type="checkbox"
					id="filtro-preferiti"
					class="border-none outline-none accent-quaternary"
					v-model="favoriteFilter"
				/>
				<label for="filtro-preferiti" class="mx-1"
					>Solo preferiti</label
				>
			</div>
			<div class="flex px-3">
				<input
					type="checkbox"
					id="filtro-recenti"
					class="border-none outline-none accent-quaternary"
					v-model="recentsFilter"
				/>
				<label for="filtro-recenti" class="mx-1"
					>Modificate di recente</label
				>
			</div>
		</div>
		<div
			v-for="result in results"
			:key="result.id"
			class="
				mx-2
				my-1
				px-1
				py-1
				rounded-md
				overflow-hidden
				whitespace-nowrap
				cursor-pointer
				hover:bg-primary hover:text-neutral
			"
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
			searchResults: [],
			favoriteFilter: false,
			recentsFilter: false,
		};
	},
	watch: {
		favoriteFilter(newValue, oldValue) {
			this.results = this.applyFavoriteFilter(this.searchResults);
		},
		recentsFilter(newValue, oldValue) {
			this.results = this.applyRecentsFilter(this.searchResults);
		},
	},
	methods: {
		search() {
			let query = this.searchQuery;
			this.searchResults = this.store.fuse
				.search(query)
				.map((x) => x.item);
			this.results = this.applyFavoriteFilter(this.searchResults);
			this.results = this.applyRecentsFilter(this.results);
		},
		applyFavoriteFilter(results) {
			let favoriteFilter = this.favoriteFilter;
			return results.filter((x) =>
				favoriteFilter ? x.favorite == true : true
			);
		},
		applyRecentsFilter(results) {
			let recentsFilter = this.recentsFilter;
			let days = 5;
			let date = new Date();
			date.setDate(date.getDate() - days);
			return results.filter((x) =>
				recentsFilter ? x.updated > date : true
			);
		},
		inputListener() {
			if (this.timeoutId) clearTimeout(this.timeoutId);
			this.timeoutId = setTimeout(this.search, 500);
		},
		async changeOpen(item) {
			await this.store.changeSelectedNote(item);
		},
	},
};
</script>