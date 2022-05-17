<template>
	<div class="flex h-full w-full">
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
					class="stroke-quaternary cursor-pointer my-4"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
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
					class="stroke-quaternary cursor-pointer my-4"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
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
			</div>
		</div>
		<div class="w-full h-full flex-column">
			<div class="h-[50px] bg-primary">

			</div>
			<div class="h-full scroll-auto">
				<editor />
			</div>
		</div>
	</div>
</template>

<script>
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import Editor from '../components/Editor.vue';
export default {
	name: "Home",
	components: {
		Editor
	},
	data() {
		
	}
};
</script>