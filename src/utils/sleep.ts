export const sleep = (time = 1000) => {
    return new Promise(a => setTimeout(a, time))
}