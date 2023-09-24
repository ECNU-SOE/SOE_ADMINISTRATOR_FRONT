const LOCAL_JWT_KEY = "jskdfls";
export const setJwtToken = (jwtToken) => {
    sessionStorage.setItem(LOCAL_JWT_KEY,jwtToken)
}
export const getJwtToken = () => {
    return sessionStorage.getItem(LOCAL_JWT_KEY)
}
export const getTokenUser = () => {
    let token = getJwtToken().replace('soe-token-','');
    // let strings = token.split("."); //截取token，获取载体
    // let userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
    // let userString = decodeURIComponent(window.atob(token.split('.')[1]))
    let userString = decodeURIComponent(escape(window.atob(token.split('.')[1].replace(/-/g, "+").replace(/_/g, "/"))))
  return JSON.parse(userString).loginUser && JSON.parse(userString).loginUser.phone || ""
}

export function getCurrentTimeStr(time){
    try {
        let timestamp = new Date(time).getTime();
        let date = new Date(timestamp);
        let year = date.getFullYear();
        let month = date.getMonth() + 1  < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }catch (e){
        return time;
    }
}

export function getCurrentTimeStrWithoutHour(time){
    try {
        let timestamp = new Date(time).getTime();
        let date = new Date(timestamp);
        let year = date.getFullYear();
        let month = date.getMonth() + 1  < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return year + '-' + month + '-' + day;
    }catch (e){
        return time;
    }
}