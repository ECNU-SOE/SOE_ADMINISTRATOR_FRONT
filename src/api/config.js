import request from "../utils/request";

export const getAllSysConfig = () => {
    return request({
        url:'sysconfig/all',
        method:'post'
    })
}

//刷新数据库全局配置到服务端内存
//并再次加载全局配置参数到前端
export const refreshSysConfig = () => {
    return request({
        url:'sysconfig/refresh',
        method:'post'
    })
}