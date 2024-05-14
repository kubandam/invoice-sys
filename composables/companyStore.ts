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
    async getCompanyById(id: string) {
      try {
        let data = await $fetch<ICompany>(`/api/companies/${id}`);
        this.company = data;
        return data as ICompany;
      } catch (e: any) {
        console.error("Error fetching company:", e.message);
      }
    },
    async createOrUpdateCompany(companyData: ICompany) {
        const toast = useToast();
        if (companyData._id) {
            try {
                const response = await $fetch(`/api/companies/${companyData._id}`, {
                    method: "PUT",
                    body: companyData,
                }) as any;
                this.company = response; 
                toast.add({ title: 'Success', description: 'Company updated successfully', color: 'green' });
            } catch (error: any) {
                const errorMessage = error.data?.message || error.message;
                toast.add({ title: 'Error', description: errorMessage, color: 'red' });
            }
        } else {
            try {
                const response = await $fetch(`/api/companies/create`, {
                    method: "POST",
                    body: companyData,
                }) as any;
                this.company = response; 
                toast.add({ title: 'Success', description: 'Company created successfully', color: 'green' });
            } catch (error: any) {
                const errorMessage = error.data?.message || error.message;
                toast.add({ title: 'Error', description: errorMessage, color: 'red' });
            }
        }
    }
  },
});
