<template>
	<label :for="name" class="text-neutral mt-4">{{ label }}</label>
	<div class="relative w-full h-fit mt-2">
		<svg
			v-if="name == 'email'"
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			viewBox="0 0 24 24"
			stroke-width="1"
			class="stroke-secondary absolute top-1/2 left-1 -translate-y-1/2"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<polyline points="3 7 12 13 21 7" />
		</svg>
		<svg
			v-else-if="name == 'username'"
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			viewBox="0 0 24 24"
			stroke-width="1"
			class="stroke-secondary absolute top-1/2 left-1 -translate-y-1/2"
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
			class="stroke-secondary absolute top-1/2 left-1 -translate-y-1/2"
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
			v-model="inputValue"
			@blur="checkValidity"
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
	<p
		class="text-quaternary text-1s mt-1 opacity-0 self-end"
		:class="{ 'opacity-100': !store[name].valid }"
	>
		{{ store[name].error }}
	</p>
</template>

<script>
import { useAuthformStore } from "@/stores/authformStore";

export default {
	name: "CustomInput",
	props: {
		label: String,
		name: String,
		type: String,
	},
	data() {
		return {
			store: useAuthformStore(),
			inputValue: "",
		};
	},
	watch: {
		inputValue(newValue, oldValue) {
			let input = this.store[this.name];
			input.valid = true;
			input.value = this.inputValue;
		},
	},
	methods: {
		checkValidEmail() {
			let email = this.store.email;
			if (!this.inputValue.length) {
				email.valid = false;
				email.error = "L'email non può essere vuota";
			} else if (
				!/\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*/.test(
					this.inputValue
				)
			) {
				email.valid = false;
				email.error = "Email non valida";
			}
		},
		checkValidPassword() {
			let password = this.store.password;
			if (!this.inputValue.length) {
				password.valid = false;
				password.error = "La password non può essere vuota";
			} else if (this.inputValue.length < 8) {
				password.valid = false;
				password.error = "Inserisci almeno 8 caratteri";
			}
		},
		checkValidUsername() {
			let username = this.store.username;
			if (!this.inputValue.length) {
				username.valid = false;
				username.error = "L'username non può essere vuoto";
			}
		},
		checkValidity() {
			switch (this.name) {
				case "email":
					this.checkValidEmail();
					break;
				case "password":
					this.checkValidPassword();
					break;
				case "username":
					this.checkValidUsername();
					break;
				default:
					break;
			}
		},
	},
};
</script>