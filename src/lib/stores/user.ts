import { writable, type Writable } from 'svelte/store';

export const username: Writable<null |string> = writable(null);