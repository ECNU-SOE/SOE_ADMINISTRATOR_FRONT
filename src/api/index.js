import request from '../utils/request';
import config from '../config/config.js'
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
        url: "http://47.101.58.72:8888/user-server/api/user/v1/login",
        method: 'post',
        data: query,
        params:{}
    });
};


