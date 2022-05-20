<template>
	<custom-dialog
		:open="openDialog"
		:error="dialogError"
		@close="closeDialog"
	/>
	<div class="w-full h-full">
		<div
			class="
				absolute
				top-1/2
				left-1/2
				-translate-x-1/2 -translate-y-1/2
				bg-primary
				text-neutral
				min-w-[300px]
				w-5/12
				rounded-md
				py-6
				px-8
			"
		>
			<h1 class="text-secondary font-medium text-2x">
				{{ method == "login" ? "Login" : "Registrati" }}
			</h1>
			<form action="" class="flex flex-col py-2" @submit.prevent="submit">
				<custom-input label="Email" name="email" type="text" />
				<keep-alive>
					<custom-input
						v-if="method == 'register'"
						label="Username"
						name="username"
						type="text"
					/>
				</keep-alive>
				<custom-input
					label="Password"
					name="password"
					type="password"
				/>
				<button
					type="submit"
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
					:disabled="disableButton"
				>
					{{ method == "login" ? "Login" : "Registrati" }}
				</button>
				<a :href="googleLink" class="self-center mt-4">
					<button
						type="button"
						class="
							flex
							bg-secondary
							font-medium
							rounded-full
							p-2
							items-center
						"
						:disabled="disableButton"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							stroke-width="2"
							class="stroke-neutral"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
						</svg>
						<p class="ml-1">Accedi con Google</p>
					</button>
				</a>
				<p
					class="self-center mt-8 cursor-pointer"
					@click="method = method == 'login' ? 'register' : 'login'"
				>
					{{
						method == "login"
							? "Non hai un account? "
							: "Hai già un account? "
					}}
					<span class="text-secondary">{{
						method == "login" ? "Registrati!" : "Effettua il login!"
					}}</span>
				</p>
			</form>
		</div>
		<div class="overflow-hidden w-full h-full background flex">
			<!-- viewBox="0 0 1728 1117" -->
			<svg
				width="1728"
				height="1117"
				viewBox="432 100 864 1000"
				preserveAspectRatio="xMidYMid meet"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-primary max-h-full max-w-full"
			>
				<path
					d="M2374.62 107.431C2012.83 162.16 1445.6 272.918 1734.17 622.551C2101.4 1067.48 2998.78 950.925 2600.22 1294.34"
					stroke-width="8.2894"
				/>
				<path
					d="M2246.15 92.6888C1884.36 147.418 1317.13 258.175 1605.7 607.809C1972.93 1052.74 2870.31 936.182 2471.75 1279.6"
					stroke-width="8.2894"
				/>
				<path
					d="M2118.26 73.5926C1756.46 128.321 1189.23 239.079 1477.8 588.713C1845.03 1033.65 2742.42 917.086 2343.86 1260.5"
					stroke-width="8.2894"
				/>
				<path
					d="M1990.69 52.3892C1628.9 107.118 1061.67 217.876 1350.24 567.509C1717.46 1012.44 2614.85 895.882 2216.29 1239.3"
					stroke-width="8.2894"
				/>
				<path
					d="M1863.19 30.8298C1501.39 85.5587 934.162 196.316 1222.73 545.95C1589.96 990.883 2487.35 874.323 2088.79 1217.74"
					stroke-width="8.2894"
				/>
				<path
					d="M1735.52 10.2343C1373.73 64.9631 806.498 175.721 1095.07 525.354C1462.3 970.288 2359.68 853.728 1961.12 1197.14"
					stroke-width="8.2894"
				/>
				<path
					d="M1607.56 -8.43097C1245.77 46.2979 678.537 157.056 967.108 506.689C1334.33 951.622 2231.72 835.062 1833.16 1178.48"
					stroke-width="8.2894"
				/>
				<path
					d="M1479.25 -24.4768C1117.45 30.2521 550.222 141.01 838.793 490.643C1206.02 935.577 2103.41 819.017 1704.85 1162.43"
					stroke-width="8.2894"
				/>
				<path
					d="M1350.58 -37.4371C988.787 17.2918 421.558 128.049 710.129 477.683C1077.36 922.616 1974.74 806.056 1576.18 1149.47"
					stroke-width="8.2894"
				/>
				<path
					d="M1220.83 -47.1367C859.032 7.59217 291.803 118.35 580.374 467.983C947.6 912.917 1844.99 796.357 1446.43 1139.77"
					stroke-width="8.2894"
				/>
				<path
					d="M1091.73 -54.6026C729.933 0.12629 162.704 110.884 451.275 460.517C818.501 905.451 1715.89 788.891 1317.33 1132.3"
					stroke-width="8.2894"
				/>
				<path
					d="M962.535 -60.2032C600.74 -5.47436 33.5111 105.283 322.082 454.917C689.309 899.85 1586.7 783.29 1188.14 1126.7"
					stroke-width="8.2894"
				/>
				<path
					d="M833.267 -63.6826C471.471 -8.95373 -95.7574 101.804 192.813 451.437C560.04 896.371 1457.43 779.811 1058.87 1123.22"
					stroke-width="8.2894"
				/>
				<path
					d="M703.957 -64.72C342.161 -9.99114 -225.068 100.766 63.5032 450.4C430.73 895.333 1328.12 778.773 929.557 1122.19"
					stroke-width="8.2894"
				/>
				<path
					d="M574.655 -62.9059C212.859 -8.17699 -354.37 102.581 -65.7987 452.214C301.428 897.147 1198.81 780.587 800.255 1124"
					stroke-width="8.2894"
				/>
				<path
					d="M445.445 -57.7014C83.649 -2.97246 -483.58 107.785 -195.009 457.419C172.218 902.352 1069.6 785.792 671.045 1129.21"
					stroke-width="8.2894"
				/>
				<path
					d="M316.466 -48.3781C-45.3296 6.35078 -612.558 117.108 -323.988 466.742C43.2391 911.675 940.626 795.115 542.066 1138.53"
					stroke-width="8.2894"
				/>
				<path
					d="M187.961 -33.9133C-173.835 20.8156 -741.063 131.573 -452.492 481.207C-85.2657 926.14 812.121 809.58 413.561 1152.99"
					stroke-width="8.2894"
				/>
				<path
					d="M60.3689 -12.8308C-301.427 41.8981 -868.655 152.656 -580.085 502.289C-212.858 947.223 684.529 830.663 285.969 1174.08"
					stroke-width="8.2894"
				/>
				<path
					d="M-65.4284 16.976C-427.224 71.7049 -994.453 182.462 -705.882 532.096C-338.655 977.029 558.732 860.469 160.172 1203.88"
					stroke-width="8.2894"
				/>
				<path
					d="M-187.54 56.7346C-549.336 111.464 -1116.56 222.221 -827.994 571.855C-460.767 1016.79 436.619 900.228 38.0596 1243.64"
					stroke-width="8.2894"
				/>
			</svg>
		</div>
	</div>
</template>

<script>
import CustomInput from "@/components/CustomInput.vue";
import CustomDialog from "@/components/CustomDialog.vue";
import http from "@/assets/scripts/axios-config";
import {
	API_LOGIN_URL,
	API_REGISTER_URL,
	API_GOOGLE_URL,
	API_BASE_URL,
} from "../../config";
import { useAuthformStore } from "@/stores/authformStore";
import { useUserStore } from "@/stores/userStore";

export default {
	name: "AuthForm",
	components: {
		CustomInput,
		CustomDialog,
	},
	data() {
		return {
			method: "login", //login, register
			disableButton: false,
			openDialog: false,
			dialogError: "Errore",
			googleLink: API_BASE_URL + API_GOOGLE_URL,
		};
	},
	methods: {
		async submit() {
			let store = useAuthformStore();
			let user = useUserStore();
			let [email, password, username] = [
				store.email,
				store.password,
				store.username,
			];
			if (!email.valid || !password.valid) return;
			if (this.method == "register" && !username.valid) return;
			if (
				!email.value.length ||
				!password.value.length ||
				(!username.value.length && this.method == "register")
			) {
				email.error = "L'email non può essere vuota";
				password.error = "La password non può essere vuota";
				email.valid = email.value.length;
				password.valid = password.value.length;
				username.error = "L'username non può essere vuoto";
				username.valid =
					this.method == "register" ? username.value.length : true;
				return;
			}
			this.disableButton = true;
			let response;
			try {
				if (this.method == "login") {
					response = await http.post(API_LOGIN_URL, {
						email: email.value,
						password: password.value,
					});
				} else {
					response = await http.post(API_REGISTER_URL, {
						email: email.value,
						password: password.value,
						name: username.value,
					});
				}
			} catch (error) {
				this.openDialog = true;
				if (error?.response?.status == 400) {
					this.dialogError = "Email o password errata";
				} else {
					this.dialogError = "Si è verificato un errore";
				}
				return;
			}
			user.authToken = response.data.token;
			this.disableButton = false;
			this.$router.push({ name: "home" });
		},
		closeDialog() {
			this.openDialog = false;
			this.disableButton = false;
		},
	},
};
</script>