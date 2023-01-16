
//根据登录用户名加载该用户可以访问的菜单
import request from "../utils/request";

export const getMenuTreeByUsername = (opt) => {
    return request({
        url:`${opt.url}system/sysmenu/tree/user`,
        method:'post',
        data:opt,
        params:{},
        headers:{
            token:opt.token
        }
    })
}

