
const date = new Date();
const year = date.getFullYear()
const month = ('0' + (date.getMonth() + 1)).slice(-2)
const day = ('0' + (date.getDate() + 1)).slice(-2)
const hour = ('0' + (date.getHours() + 1)).slice(-2)
const minute = ('0' + (date.getMinutes() + 1)).slice(-2)
const second = ('0' + (date.getSeconds() + 1)).slice(-2)
export const getToday = `${day}/${month}/${year} ${hour}:${minute}:${second}`