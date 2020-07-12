import { writable } from 'svelte/store';

// function createUserStore() {
//     const { subscribe, update, set } = writable(null);

//     return {
//         subscribe,

//     }
// }

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

function createUserStore() {
    const { subscribe, update, set } = writable({});

    return {
        subscribe,
        set,
        reset: () => set({})
    }
}

export const user = writable({});

export const authToken = createAuthStore();