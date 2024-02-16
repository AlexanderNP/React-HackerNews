export function convertDate(date){
  const newDate = new Date(date * 1000);
  return newDate.toLocaleTimeString() 
}