import { defineStore } from 'pinia';
import { useUserStore } from './user'

export const useMessageStore = defineStore({
  id: 'messages',
  state: () => ({
    messages: {}
  }),
  actions: {
    async addMessage(message) {
      const userStore = useUserStore()
      const { sender, target, content, timestamp } = message
      const targetPhone = userStore.user.phone === target ? sender.phone : target
    
      if (!this.messages[targetPhone]) {
        this.messages[targetPhone] = {
          user: { phone: targetPhone },
          messages: []
        };
      }
    
      this.messages[targetPhone].messages.push({
        phone: sender.phone,
        content,
        timestamp
      });
    },    
    getAllMessages() {
        return this.messages || [];
    },
    getMessages(user) {
      return this.messages[user.phone] || [];
    },
    clearMessages(user) {
      this.messages[user] = [];
    }
  }
});