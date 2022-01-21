import { AuthStoreInterface } from "@/interfaces/auth.interface";
import { defineStore }        from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  } as AuthStoreInterface),
  getters: {},
  actions: {
    connect (userId: number, userName: string) {
      // Make API call to authenticate user
      this.user = { id: userId, name: userName };
    },
    disconnect () {
      this.user = null;
    },
  },
});
