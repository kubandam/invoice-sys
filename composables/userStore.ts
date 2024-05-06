import { defineStore } from "pinia";
import type { IUser } from "~~/types";

export const useUserStore = defineStore("user-store", {
	state: () => ({
		users: [] as IUser[],
	}),
	actions: {
		async getAll() {
			try {
				let data = await $fetch<IUser[]>("/api/users");
				this.users = data;
				return data as IUser[];
			} catch (e:any) {
				console.log(e.message);
			}
		},
		async create(name: string, email: string) {
			await $fetch("/api/users/create", {
				method: "POST",
				body: { name,email },
			})
				.catch((e) => {
					console.log(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					console.log("User created");
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