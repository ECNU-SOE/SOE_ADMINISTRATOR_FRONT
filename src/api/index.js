import request from '../utils/request';
import config from '../config/config.js'
let baseUrl = "http://47.101.58.72:8888/";

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
        url: `${baseUrl}user-server/api/user/v1/login`,
        method: 'post',
        data: query,
        params:{}
    });e
};


export const getLanguageMaterial = (query) => {
    return request({
        url: `${baseUrl}corpus-server/api/corpus/v1/list?cur=1&size=20`,
        method: 'post',
        data: query,
        params:{}
    });
};

export const addLanguageMaterial = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/corpus/v1/add`,
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
        url: `${baseUrl}corpus-server/api/cpsgrp/v1/create`,
        method: 'post',
        data: opt,
        params:{},
        headers:{
            token:opt.token
        }
    });
};

export const showAllLanguageMaterialGroup = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};

export const deleteLanguageMaterialGroup = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/cpsgrp/v1/del?cpsgrpId=${opt.id}`,
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
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const updateRole = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const addRole = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const deleteRole = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const changeRoleStatus = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const getMenuCheckedTree = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const saveMenuCheckedKeys = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const getApiCheckedTree = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const saveApiCheckedKeys = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};

export const getUsers = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const updateUser = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const addUser = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const deleteUser = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const resetUserPwd = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const changeEnabled = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const getCheckedRoles = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const saveCheckedUserRoles = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};
export const getOrgTree = (opt) => {
    return request({
        url: `${baseUrl}corpus-server/api/test/v1/details?cpsgrpId=cpsgrp_${opt.id || '1588871928125460480'}`,
        method: 'get',
        data: opt,
        params:{}
    });
};

