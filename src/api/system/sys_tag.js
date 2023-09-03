import {newJwtServerInstance} from "../index";
import {getJwtToken} from "@/lib/utils";

export const getTagsList = function (opt){
    return newJwtServerInstance.request({
        url:'/corpus-server/api/tag/v1/list?cur=1&size=10',
        method:'post',
        headers:{
            token:getJwtToken()
        },
        data: opt,
        params:{}
    })
}

export const updateTags = function (opt){
    return newJwtServerInstance.request({
        url:'/corpus-server/api/tag/v1/update',
        method:'post',
        headers:{
            token:getJwtToken()
        },
        data: opt,
        params:{}
    })
}

export const addTags = function (opt){
    return newJwtServerInstance.request({
        url:'/corpus-server/api/tag/v1/create',
        method:'post',
        headers:{
            token:getJwtToken()
        },
        data: opt,
        params:{}
    })
}

export const deleteTags = function (opt){
    return newJwtServerInstance.request({
        url:`/corpus-server/api/tag/v1/del?id=${opt.id}`,
        method:'get',
        headers:{
            token:getJwtToken()
        },
        data: opt,
        params:{}
    })
}