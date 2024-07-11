import { UserType } from "../components/commonPages/Update";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const convertedDate = (date: any) => {
  const utcDate = new Date(date);
  const localDateTimeString = utcDate.toLocaleString();
  return localDateTimeString;
};

export const commonUser = () => {
  const localdata: any = localStorage.getItem("User");
  const localUser: UserType = JSON.parse(localdata);
  return localUser;
};
export const apiUrl = import.meta.env.VITE_API_URL;
