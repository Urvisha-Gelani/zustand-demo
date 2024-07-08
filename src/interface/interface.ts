/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
   id: number;
   username: string;
   first_name: string;
   last_name: string;
   email: string;
   gender: string;
   password: string;
   is_admin?: boolean
   created: string;
   updated: string
}

export interface userData {
   data: User
}

export interface companyType {
   [x: string]: any;
   id?: number;
   name: string;
   location: string;
   about: string;
   type: string;
   created?: string | undefined;
   updated?: string | undefined;
   active?: boolean
}

