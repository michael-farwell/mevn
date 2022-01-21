import { AuthStoreInterface } from "@/interfaces/auth.interface";
import { defineStore }        from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: { id: "", name: "" },
  } as AuthStoreInterface),
  getters: {},
  actions: {
    connect () {
      // Make API call to authenticate user
      this.user.id = "";
      this.user.name = "";
    },
    disconnect () {
      this.user.id = "";
      this.user.name = "";
    },
  },
});
