import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null
  }),
  actions: {
    setUser(userInfo) {
      this.user = userInfo;
    },
    clearUser() {
      this.user = null;
    }
  }
});