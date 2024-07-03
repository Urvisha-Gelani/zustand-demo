export interface User {
   id : number;
   username : string;
   first_name : string;
   last_name : string;
   email : string;
   gender:string;
   password:string;
   is_admin?:boolean
   created : string;
   updated: string
}

export interface userData {
   data : User
}
