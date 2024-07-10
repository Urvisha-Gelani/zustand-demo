/* eslint-disable @typescript-eslint/no-explicit-any */
export  const convertedDate = (date:any) => {
    const utcDate = new Date(date);
    const localDateTimeString = utcDate.toLocaleString();
    return localDateTimeString;
}
export const apiUrl = import.meta.env.VITE_API_URL