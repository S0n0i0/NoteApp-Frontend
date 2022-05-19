import { defineStore } from 'pinia';

export const useAuthformStore = defineStore('authform', {
    state: () => {
        return {
            email: {
                value: '',
                valid: true,
                error: 'errore'
            },
            password: {
                value: '',
                valid: true,
                error: 'errore'
            },
        };
    },
});