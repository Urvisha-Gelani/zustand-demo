export  const convertedDate = (date:string) => {
    const utcDate = new Date(date);
    const localDateTimeString = utcDate.toLocaleString();
    return localDateTimeString;
}