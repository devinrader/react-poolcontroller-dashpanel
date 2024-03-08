import { io } from 'socket.io-client';

const socketUrl:string = 'ws://10.0.4.10:4200/';

// "undefined" means the URL will be computed from the `window.location` object
const URL:string = socketUrl;

export const socket = io(URL, { 
    autoConnect: false
});