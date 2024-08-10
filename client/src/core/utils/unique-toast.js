// returns a unique 6 length random string, which helps the toast to not get repeted, with the same message
export const uniqueToast = ()=>{
    const randomId = Math.random().toString(36).substring(2, 8);
    return randomId
}