import type { CookieRef } from "#app";
import { defineStore } from "pinia";
import type { ICompany } from "~~/types";

export const useCompanyStore = defineStore("company-store", {
  state: () => ({
    companies: [] as ICompany[],
    company: {} as ICompany,
  }),
  actions: {
    async getAllCompanies() {
      try {
        let data = await $fetch<ICompany[]>("/api/companies");
        this.companies = data;
        return data as ICompany[];
      } catch (e: any) {
        console.error("Error fetching companies:", e.message);
      }
    },
    async fetchCompanyData(user_id: string) {
      try {
        const data = (await $fetch<ICompany>("/api/companies/byUser", {
          method: "POST",
          body: { user_id: user_id },
        })) as ICompany;
        this.company = data;
        return data;
      } catch (e: any) {
        console.error("Error fetching company:", e.message);
      }
    },
    async createOrUpdateCompany(companyData: any) {
      const toast = useToast();
      if (companyData._id) {
        const { __v, _id, createdAt, updatedAt, ...companyNewData } = companyData;
        try {
          const response = (await $fetch(`/api/companies/update`, {
            method: "PUT",
            body: { companyData: companyNewData, companyID: companyData._id },
          })) as any;
          this.company = response;
          toast.add({
            title: "Success",
            description: "Company updated successfully",
            color: "green",
          });
        } catch (error: any) {
          const errorMessage = error.data?.message || error.message;
          toast.add({
            title: "Error",
            description: errorMessage,
            color: "red",
          });
        }
      } else {
        try {
          const response = (await $fetch(`/api/companies/create`, {
            method: "POST",
            body: companyData,
          })) as any;
          this.company = response;
          toast.add({
            title: "Success",
            description: "Company created successfully",
            color: "green",
          });
        } catch (error: any) {
          const errorMessage = error.data?.message || error.message;
          toast.add({
            title: "Error",
            description: errorMessage,
            color: "red",
          });
        }
      }
    },
  },
});
