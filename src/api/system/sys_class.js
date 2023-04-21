import {jwtServerInstance} from "../index";

//条件分页查询班级信息
export const getClassInformation = (query) => {
    return jwtServerInstance.request({
        url: `/api/course/v1/list`,
        method: 'post',
        data: query,
        params:{}
    });
};

export const addClass = (opt) => {
    return jwtServerInstance.request({
        url: `/api/course/v1/add`,
        method: 'post',
        data: opt.data,
        params:{},
        headers:{
            token:opt.token
        }
    });
};

export const updateClass = (opt) => {
    return jwtServerInstance.request({
        url: `/api/course/v1/update`,
        method: 'post',
        data: opt.data,
        params:{},
        headers:{
            token:opt.token
        }
    });
};

export const deleteClass = (opt) => {
    return jwtServerInstance.request({
        url: `/api/course/v1//del/4`,
        method: 'get',
        data: opt,
        params:{},
        headers:{
            token:opt.token
        }
    });
};
