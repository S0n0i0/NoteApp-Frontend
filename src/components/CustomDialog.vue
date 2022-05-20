<template>
	<dialog
		ref="dialog"
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
		"
	>
		<div
			class="
				w-full
				h-full
				absolute
				-z-10
				bg-tertiary bg-opacity-30
				blur-lg
			"
		></div>
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
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="60"
				height="60"
				viewBox="0 0 24 24"
				stroke-width="2"
				class="stroke-secondary my-6"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M12 9v2m0 4v.01" />
				<path
					d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"
				/>
			</svg>
			<p>{{ error }}</p>
			<form method="dialog" class="pt-16">
				<button class="bg-secondary font-medium rounded-md px-4 py-2">
					Chiudi
				</button>
			</form>
		</div>
	</dialog>
</template>

<script>
export default {
	name: "CustomDialog",
	props: {
		open: Boolean,
		error: String,
	},
	watch: {
		open(newValue, oldValue) {
			if (newValue && !oldValue) {
				this.$refs.dialog.showModal();
			}
		},
	},
};
</script>