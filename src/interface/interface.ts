/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
  id: number|string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  password: string;
  is_admin?: boolean;
  created: string;
  updated: string;
}

export interface userData {
  data: User;
}

export interface companyType {
  [x: string]: any;
  id?: number;
  name: string;
  location: string;
  about: string;
  type: string;
  created?: string;
  updated?: string;
  active?: boolean;
}

export interface companyDepartmentType {
  id: number;
  company: string;
  name: string;
  description: string;
  created: string;
  updated: string;
}
export interface departmentCompanies {
  FieldValue?: any;
  name: string;
  description: string;
  company_id: number | string;
}
