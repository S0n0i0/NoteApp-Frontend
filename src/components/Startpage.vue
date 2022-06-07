<template>
	<div class="flex-1 p-6">
		<h1 class="text-2x font-medium">Noteapp</h1>
		<div class="grid grid-cols-2 mt-6">
			<div>
				<h2 class="font-medium text-secondary mb-2">Avvia</h2>
				<div
					class="flex items-center cursor-pointer pb-1"
					@click="addNote"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						class="stroke-secondary mr-1"
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
					<p>Nuova nota</p>
				</div>
				<div
					class="flex items-center cursor-pointer"
					@click="$emit('search')"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						class="stroke-secondary mr-1"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M14 3v4a1 1 0 0 0 1 1h4" />
						<path
							d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5"
						/>
						<circle cx="16.5" cy="17.5" r="2.5" />
						<line x1="18.5" y1="19.5" x2="21" y2="22" />
					</svg>
					<p>Cerca nota</p>
				</div>
			</div>
			<div>
				<h2 class="font-medium text-secondary mb-2">Suggerimenti</h2>
				<p class="mb-1">
					Aggiungi una nota ai preferiti per poterla ritrovare più
					facilmente
				</p>
				<p>
					Organizza le tue note tramite cartelle nella barra laterale
					a sinistra
				</p>
			</div>
			<div class="mt-4">
				<h2 class="font-medium text-secondary mb-2">Note Recenti</h2>
				<div
					v-for="note in recentsNotes"
					:key="note.id"
					class="cursor-pointer pb-1"
					@click="openNote(note)"
				>
					<p>{{ note.title }}</p>
				</div>
			</div>
			<div class="mt-4">
				<h2 class="font-medium text-secondary">News</h2>
			</div>
		</div>
	</div>
</template>

<script>
import { useFoldersStore } from "@/stores/foldersStore";

export default {
	name: "Startpage",
	emits: ["search"],
	data() {
		return {
			store: useFoldersStore(),
		};
	},
	computed: {
		recentsNotes() {
			let days = 5;
			let date = new Date();
			date.setDate(date.getDate() - days);
			return this.store.items.filter(
				(x) => x.type == "note" && x.updated > date
			);
		},
	},
	methods: {
		openNote(note) {
			if (note.saved != 0) note.saved = 2;
			this.store.selectedNote = note;
			this.store.quillRef.setContents(note.content);
		},
		async addNote() {
			let note = await this.store.addItem("note");
			if (note != null) {
				this.openNote(note);
			}
		},
	},
};
</script>