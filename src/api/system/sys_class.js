import {jwtServerInstance} from "../index";
import {getJwtToken} from "@/lib/utils";

//条件分页查询班级信息
export const getClassInformation = (query) => {
    return jwtServerInstance.request({
        url: `/api/class/v1/list?cur=1&size=10`,
        method: 'post',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const getCurrentClassInformation = (query) => {
    return jwtServerInstance.request({
        url: `/api/class/v1/detail?id=${query.id}`,
        method: 'get',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};


export const addClass = (opt) => {
    return jwtServerInstance.request({
        url: `/api/class/v1/add`,
        method: 'post',
        data: opt,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const updateClass = (opt) => {
    return jwtServerInstance.request({
        url: `/api/class/v1/update`,
        method: 'post',
        data: opt,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const deleteClass = (opt) => {
    return jwtServerInstance.request({
        url: `/api/class/v1/del?id=${opt.id}`,
        method: 'get',
        data: opt,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};
