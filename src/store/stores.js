import { writable } from 'svelte/store';

function createAuthStore() {
    const { subscribe, update, set } = writable(localStorage.getItem('token') || '');

    return {
        subscribe,
        set: (value) => {
            set(value);
            localStorage.setItem('token', value);
        },
        reset: () => set('')
    }
}

export const user = writable({});

export const authToken = createAuthStore();