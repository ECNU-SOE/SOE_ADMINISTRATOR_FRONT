
import {jwtServerInstance} from "../index";
import qs from	'qs'
import {getJwtToken} from "@/lib/utils";

//查询所有数据字典项
export const getAllSysDict = () => {
    return jwtServerInstance.request({
        url:'/system/sysdict/all',
        method:'post',
        headers:{
          token:getJwtToken()
        }
    })
}

//参数配置列表查询接口
export const getSysDict =
           ( groupName,
            groupCode ) => {
    return jwtServerInstance.request({
        url:'/system/sysdict/query',
        method:'post',
        headers:{
            token:getJwtToken()
        },
        data:qs.stringify({
            groupName,
            groupCode
        })
    })
}

//更新sys_dict的一条数据记录
export const updateSysDict = (dialogForm) => {
    return jwtServerInstance.request({
        url:'/system/sysdict/update',
        method:'post',
        headers:{
            token:getJwtToken()
        },
        data:dialogForm
    })
}

//新增一条sys_dict数据记录
export const addSysDict = (dialogForm) => {
    return jwtServerInstance.request({
        url:'/system/sysdict/add',
        method:'post',
        headers:{
            token:getJwtToken()
        },
        data:dialogForm
    })
}

//删除一条sys_dict数据记录
export const deleteSysDict = (deleteId) => {
    return jwtServerInstance.request({
        url:'/system/sysdict/delete',
        method:'post',
        headers:{
            token:getJwtToken()
        },
        data:qs.stringify({
            id:deleteId
        })
    })
}