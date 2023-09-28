import { defineStore } from 'pinia';
import { io } from 'socket.io-client';

export const useSocketStore = defineStore({
  id: 'socket',
  state: () => ({
    socket: null
  }),
  actions: {
    connect() {
			this.socket = io('http://localhost:3000', {
        auth: {
          token: localStorage.getItem('token')
        }
      });
    },
    sendMessage(message) {
      this.socket.emit('message', message);
    }
  }
});
