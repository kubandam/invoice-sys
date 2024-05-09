import type { CookieRef } from "#app";
import { defineStore } from "pinia";
import type { IUser } from "~~/types";

export const useUserStore = defineStore("user-store", {
  state: () => ({
    users: [] as IUser[],
    user: { name: "", email: "", phone: "" } as IUser,
  }),
  actions: {
    async getAll() {
      try {
        let data = await $fetch<IUser[]>("/api/users");
        this.users = data;
        return data as IUser[];
      } catch (e: any) {
        console.log(e.message);
      }
    },
    async getOneByNameAndPassword(name: string, password: string) {
      try {
        let data = await $fetch<IUser>("/api/users/getUser", {
          method: "POST",
          body: { name, password },
        });
        return data as IUser;
      } catch (e: any) {
        console.log(e.message);
      }
    },
    async create(name: string, email: string, password: string) {
      await $fetch("/api/users/create", {
        method: "POST",
        body: { name, email, password },
      })
        .catch((e) => {
          console.log(e.data.message);
        })
        .then(async () => {
          await this.getAll();
          console.log("User created");
        });
    },
    async editProfile(id: string, name?: string, phone?: string) {
      await $fetch(`/api/users/${id}`, {
        method: "PUT",
        body: { name, phone },
      })
        .catch((e) => {
          console.log(e.data.message);
        })
        .then(async () => {
          const user = useCookie("user") as CookieRef<{}>;
          if (user.value) {
            user.value = {
              ...user.value,
              name: name, // Keep existing fields
              phone: phone, // Update the phone field
            };
          }
          console.log("User updated");
        });
    },
    async remove(id: string) {
      await $fetch(`/api/users/${id}`, {
        method: "DELETE",
      })
        .catch((e) => {
          console.log(e.data.message);
        })
        .then(async () => {
          await this.getAll();
          console.log("User removed");
        });
    },
  },
});
