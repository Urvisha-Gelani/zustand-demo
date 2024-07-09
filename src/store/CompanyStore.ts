/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { companyType } from "../interface/interface";
import axios from "axios";

export interface compnayStoreState {
    compnayLoading: boolean;
    allCompanies: companyType | companyType[];
    getAllComapnies: (page: number) => void;
    companyError: string;
    postCompany: (data: companyType, page: number) => void;
    clearCompanyError: () => void;
    success: boolean;
    hideCompanyPopUp: () => void;
    updateCompany: (data: companyType, page: number, id: number) => void;
    companyDelete: (id: number, page: number) => void;
    company: companyType | companyType[]
    getCompany: (id: number) => void;
}

export const useCompanyStore = create<compnayStoreState>((set, get) => ({
    compnayLoading: false,
    allCompanies: [],
    companyError: "",
    success: false,
    company: [],
    getAllComapnies: async (page) => {
        try {
            set({ compnayLoading: true })
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.get(`http://192.168.1.17:9000/api/companies?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            set({ compnayLoading: false, allCompanies: response.data.data.Companies })
        } catch (error: any) {
            if (error.response.data.status == 401) {
                localStorage.clear()
            } else if (error.response.data.status == 404) {
                set({ allCompanies: [] })
            }
            set({ compnayLoading: false })
        }
    },
    postCompany: async (data, page) => {
        try {

            set({ compnayLoading: true })
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.post('http://192.168.1.17:9000/api/companies/', data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            if (response.data.success) {
                set({ compnayLoading: false, success: response.data.success })
                get().getAllComapnies(page)
            }
        } catch (error: any) {
            set({ compnayLoading: false, companyError: error.response.data.errors.name })
        }
    },
    clearCompanyError: () => {
        set({ companyError: "" })
    },
    hideCompanyPopUp: () => {
        set({ success: false })
    },
    updateCompany: async (data, page, id) => {
        try {
            set({ compnayLoading: true })
            // const accessToken = localStorage.getItem('accessToken')
            const response = await axios.patch(`http://192.168.1.17:9000/api/companies/${id}`, data)
            if (response.data.success) {
                set({ success: response.data.success })
                get().getAllComapnies(page)
            }
        } catch (error: any) {
            set({ compnayLoading: false, companyError: error.response.data.errors.name })
        }
    },
    companyDelete: async (id, page) => {
        try {
            set({ compnayLoading: true })
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.delete(`http://192.168.1.17:9000/api/companies/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            set({ success: response.data.success })
            get().getAllComapnies(page)

        } catch (error) {
            set({ compnayLoading: false })
        }
    },
    getCompany: async (id) => {
        try {
            set({ compnayLoading: true })
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.get(`http://192.168.1.17:9000/api/companies/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            set({ compnayLoading: false, company: response.data.data.Company })
        } catch (error) {
            set({ compnayLoading: false })
        }
    }


}))