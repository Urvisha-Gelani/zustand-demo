/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import {
  companyDepartmentType,
  companyType,
  departmentCompanies,
} from "../interface/interface";
import axios from "axios";
import { apiUrl } from "../common/Common";

export interface compnayStoreState {
  compnayLoading: boolean;
  allCompanies: companyType | companyType[];
  getAllComapnies: (page: number) => Promise<void>;
  companyError: string;
  postCompany: (data: companyType, page: number) => Promise<void>;
  clearCompanyError: () => void;
  success: boolean;
  departmentSuccess: boolean;
  hideCompanyPopUp: () => void;
  updateCompany: (data: companyType, page: number, id: number) => Promise<void>;
  companyDelete: (id: number, page: number) => Promise<void>;
  company: companyType;
  getCompany: (id: number) => Promise<void>;
  companyDepartment: companyDepartmentType | companyDepartmentType[];
  getCompanyDepartment: (id: number) => Promise<void>;
  addCompanyDepartment: (
    data: departmentCompanies,
    id: number
  ) => Promise<void>;
}

export const useCompanyStore = create<compnayStoreState>((set, get) => ({
  compnayLoading: false,
  allCompanies: [],
  companyError: "",
  success: false,
  departmentSuccess: false,
  company: { name: "", location: "", about: "", type: "" },
  companyDepartment: [],
  getAllComapnies: async (page) => {
    try {
      set({ compnayLoading: true });
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`${apiUrl}api/companies?page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({
        compnayLoading: false,
        allCompanies: response.data.data.Companies,
      });
    } catch (error: any) {
      if (error.response.data.status == 401) {
        localStorage.clear();
      } else if (error.response.data.status == 404) {
        set({ allCompanies: [] });
      }
      set({ compnayLoading: false });
    }
  },
  postCompany: async (data, page) => {
    try {
      set({ compnayLoading: true });
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(`${apiUrl}api/companies/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success) {
        set({ compnayLoading: false, success: response.data.success });
        get().getAllComapnies(page);
      }
    } catch (error: any) {
      set({
        compnayLoading: false,
        companyError: error.response.data.errors.name,
      });
    }
  },
  clearCompanyError: () => {
    set({ companyError: "" });
  },
  hideCompanyPopUp: () => {
    set({ success: false });
  },
  updateCompany: async (data, page, id) => {
    try {
      set({ compnayLoading: true });
      // const accessToken = localStorage.getItem('accessToken')
      const response = await axios.patch(`${apiUrl}api/companies/${id}`, data);
      if (response.data.success) {
        set({ success: response.data.success });
        get().getAllComapnies(page);
      }
    } catch (error: any) {
      set({
        compnayLoading: false,
        companyError: error.response.data.errors.name,
      });
    }
  },
  companyDelete: async (id, page) => {
    try {
      set({ compnayLoading: true });
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(`${apiUrl}api/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ success: response.data.success });
      get().getAllComapnies(page);
    } catch (error) {
      set({ compnayLoading: false });
    }
  },
  getCompany: async (id) => {
    try {
      set({ compnayLoading: true });
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`${apiUrl}api/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ compnayLoading: false, company: response.data.data.Company });
    } catch (error) {
      set({ compnayLoading: false });
    }
  },
  getCompanyDepartment: async (id) => {
    try {
      set({ compnayLoading: true });
      const response = await axios.get(`${apiUrl}api/company/${id}/department`);
      // console.log(response.data)
      set({
        compnayLoading: false,
        companyDepartment: response.data.data.Departments,
      });
    } catch (error) {
      set({ compnayLoading: false });
    }
  },
  addCompanyDepartment: async (data, id) => {
    try {
      set({ compnayLoading: true });
      const response = await axios.post(`${apiUrl}api/departments/`, data);
      set({ compnayLoading: false });
      console.log(response.data, "*****res");
      if (response.data.success) {
        set({ departmentSuccess: response.data.success });
        get().getCompanyDepartment(id);
      }
    } catch (error: any) {
      console.log(error, "*****error");

      set({
        compnayLoading: false,
        companyError: error.response.data.errors.non_field_errors,
      });
    }
  },
}));
