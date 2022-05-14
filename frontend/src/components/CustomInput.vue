<template>
	<label :for="name" class="text-neutral mt-4">{{ label }}</label>
	<div class="relative w-full h-fit mt-2">
		<svg
			v-if="name == 'username'"
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			viewBox="0 0 24 24"
			stroke-width="1"
			class="stroke-secondary absolute top-1/2 left-0 -translate-y-1/2"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<circle cx="12" cy="7" r="4" />
			<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
		</svg>
		<svg
			v-else
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			viewBox="0 0 24 24"
			stroke-width="1"
			class="stroke-secondary absolute top-1/2 left-0 -translate-y-1/2"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<circle cx="8" cy="15" r="4" />
			<line x1="10.85" y1="12.15" x2="19" y2="4" />
			<line x1="18" y1="5" x2="20" y2="7" />
			<line x1="15" y1="8" x2="17" y2="10" />
		</svg>
		<input
			:type="type"
			:id="name"
			:name="name"
			class="
				bg-tertiary
				text-0x
				font-normal
				pl-10
				pr-4
				py-2
				rounded-md
				min-h-[35px]
				w-full
			"
		/>
	</div>
</template>

<script>
export default {
	name: "CustomInput",
	props: {
		label: String,
		name: String,
		type: String,
	},
};
</script>