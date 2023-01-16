//查询所有数据字典项
import request from "../utils/request";

export const getAllSysDict = () => {
    return request({
        url:'sysdict/all',
        method:'post'
    })
}

