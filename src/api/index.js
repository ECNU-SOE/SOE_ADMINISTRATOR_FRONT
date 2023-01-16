import request from '../utils/request';
import config from '../config/config.js';
let baseUrl = config.baseUrl;

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const logout = query => {
    return request({
        url: `${baseUrl}/user/login`,
        method: 'get',
        params: query
    });
};

export const getUserInformation = (query) => {
    return request({
        url: `user-server/api/user/v1/login`,
        method: 'post',
        data: query,
        params:{}
    });
};


export const getLanguageMaterial = (query) => {
    return request({
        url: `corpus-server/api/corpus/v1/list?cur=1&size=100`,
        method: 'post',
        data: query,
        params:{}
    });
};

export const addLanguageMaterial = (opt) => {
    return request({
        url: `corpus-server/api/corpus/v1/add`,
        method: 'post',
        data: opt.data,
        params:{},
        headers:{
            token:opt.token
        }
    });
};

export const addLanguageMaterialGroup = (opt) => {
    return request({
        url: `corpus-server/api/cpsgrp/v1/create`,
        method: 'post',
        data: opt,
        params:{},
        headers:{
            token:opt.token
        }
    });
};

export const getCurrentLanguageMaterialGroup = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=${opt.id}`,
        method: 'get',
        data: opt,
        params:{}
    });
};


export const showAllLanguageMaterialGroup = (opt) => {
    return request({
        url: `corpus-server/api/cpsgrp/v1/list?cur=1&size=22`,
        method: 'post',
        data: opt,
        params:{}
    });
};

export const deleteLanguageMaterialGroup = (opt) => {
    return request({
        url: `corpus-server/api/cpsgrp/v1/del?cpsgrpId=${opt.id}`,
        method: 'get',
        data: opt,
        params:{},
        headers:{
            token:opt.token
        }
    });
};


export const getRoles = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const updateRole = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const addRole = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const deleteRole = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const changeRoleStatus = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const getMenuCheckedTree = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const saveMenuCheckedKeys = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const getApiCheckedTree = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const saveApiCheckedKeys = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};

export const getUsers = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const updateUser = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const addUser = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const deleteUser = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const resetUserPwd = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const changeEnabled = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const getCheckedRoles = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const saveCheckedUserRoles = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const getOrgTree = (opt) => {
    return request({
        url: `corpus-server/api/evaluate/v1/details?cpsgrpId=cpsgrp_1588871928125460480`,
        method: 'get',
        data: opt,
        params:{}
    });
};

