import {jwtServerInstance} from "../index";
import {getJwtToken} from "@/lib/utils";

export const getCourseInformation = (query) => {
    return jwtServerInstance.request({
        url: `/api/cour/v1/list`,
        method: 'post',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const getCurrentCourseInformation = (query) => {
    return jwtServerInstance.request({
        url: `/api/cour/v1/detail?id=${query.id}`,
        method: 'get',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const addCourse = (query) => {
    return jwtServerInstance.request({
        url: `/api/cour/v1/add`,
        method: 'post',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const updateCourse = (query) => {
    return jwtServerInstance.request({
        url: `/api/cour/v1/add`,
        method: 'post',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const deleteCourse = (opt) => {
    return jwtServerInstance.request({
        url: `/api/cour/v1/del?id=${opt.id}`,
        method: 'get',
        data: opt,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};



