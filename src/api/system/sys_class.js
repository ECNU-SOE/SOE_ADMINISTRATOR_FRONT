import {jwtServerInstance} from "../index";
import {getJwtToken} from "@/lib/utils";

//条件分页查询班级信息
export const getClassInformation = (query) => {
    let data = Object.assign({},{
        "id": null,
        "courseId": "",
        "cpsgrpId": null,
        "name": null,
        "description": null,
        "level": null,
        "joinStatus": null,
        "dropStatus": null
    },query);
    return jwtServerInstance.request({
        url: `/api/class/v1/list?cur=1&size=10`,
        method: 'post',
        data: data,
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

export const getClassMembers = (opt) => {
    return jwtServerInstance.request({
        url: `/api/class/v1/list_mem`,
        method: 'post',
        data: opt,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const addClassMembers = (opt) => {
    return jwtServerInstance.request({
        url: `/api/class/v1/add_user_class`,
        method: 'post',
        data: opt,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const getTopicInformation  = (query) => {
    return jwtServerInstance.request({
        url: `/api/discuss/v1/getDiscussInfo?classId=${query.classId}&pageNum=${query.pageNum || 1}&pageSize=${query.pageSize || 10}`,
        method: 'get',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const getTopicReply  = (query) => {
    return jwtServerInstance.request({
        url: `/api/discuss/v1/getReplyInfoByCurrent?discussId=${query.discussId}&&pageNum=${query.pageNum || 1}&pageSize=${query.pageSize || 10}`,
        method: 'get',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const insertTopic = (query) => {
    return jwtServerInstance.request({
        url: `/api/discuss/v1/addDiscuss`,
        method: 'post',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const replyDiscuss = (query) => {
    return jwtServerInstance.request({
        url: `/api/discuss/v1/reply`,
        method: 'post',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const topTopic = (query) => {
    return jwtServerInstance.request({
        url: `/api/discuss/v1/topDiscuss?discussId=${query.discussId}`,
        method: 'get',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const forwardTopic = (query) => {
    return jwtServerInstance.request({
        url: `/api/discuss/v1/forward`,
        method: 'post',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const getClassDiscussInfo = (query) => {
    return jwtServerInstance.request({
        url: `/api/discuss/v1/getDiscussInfo?classId=${query.classId}&pageNum=${query.pageNum || 1}&pageSize=${query.pageSize || 10}`,
        method: 'get',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};

export const addLikes = (query) => {
    return jwtServerInstance.request({
        url: `/api/discuss/v1/addLikes?discussId=${query.discussId}`,
        method: 'get',
        data: query,
        params:{},
        headers:{
            token:getJwtToken()
        }
    });
};




