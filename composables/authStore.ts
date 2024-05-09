import { defineStore } from "pinia";
import { useUserStore } from "@/composables/userStore";
import { v4 as uuidv4 } from "uuid";

interface UserPayloadInterface {
  username: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
  }),
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const userStore = useUserStore();
      userStore.getOneByNameAndPassword(username, password).then((data) => {
        if (data) {
          const token = useCookie("token"); // useCookie new hook in nuxt 3
          token.value = uuidv4(); // set token to cookie
          this.authenticated = true; // set authenticated  state value to true
        }
      });
    },
    logUserOut() {
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});
