import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            authToken: ''
        };
    },
    actions: {
        decode() {
            return JSON.parse(
                atob(
                    this.authToken.split('.')[1]
                )
            );
        }
    },
    persist: true,
});