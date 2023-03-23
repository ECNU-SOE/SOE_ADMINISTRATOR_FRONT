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