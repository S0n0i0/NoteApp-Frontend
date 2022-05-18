<template>
	<div class="flex h-full w-full">
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
					class="
						stroke-quaternary
						cursor-pointer
						my-4
						hover:stroke-secondary
					"
					:class="{ 'stroke-secondary': activeBar == 'folders' }"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					@click="
						activeBar = activeBar == 'folders' ? 'none' : 'folders'
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
		<!-- end navbar -->
		<!-- start activebar -->
		<div
			class="h-full w-[100px] bg-secondary activebar touch-none"
			v-show="activeBar != 'none'"
		></div>
		<!-- end activebar -->
		<!-- start editor -->
		<div class="flex-1 flex flex-col">
			<!-- start titlebar -->
			<div class="h-[50px] bg-primary flex items-center">
				<input
					type="text"
					class="flex-1 bg-primary text-secondary font-medium ml-4"
					v-model="title"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					stroke-width="2"
					class="stroke-neutral ml-4 cursor-pointer"
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
					class="stroke-neutral mx-4 cursor-pointer"
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
			<div class="editor-container flex flex-col">
				<editor />
			</div>
		</div>
		<!-- end editor -->
	</div>
</template>

<script>
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import Editor from "../components/Editor.vue";
import interact from "interactjs";

export default {
	name: "Home",
	components: {
		Editor,
	},
	data() {
		return {
			title: "", //note title
			activeBar: "none", //none, folders, search, user, options
		};
	},
	mounted() {
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
};
</script>