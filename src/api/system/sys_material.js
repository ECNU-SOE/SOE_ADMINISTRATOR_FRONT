import {newJwtServerInstance} from "../index";
import {getJwtToken} from "@/lib/utils";
export const getLanguageMaterial = (query) => {
  // corpus-server
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsrcd/v1/list?cur=${query.pageNum || '1'}&size=${query.pageSize || '999'}`,
    method: 'post',
    data: query,
    params:{}
  });
};

export const addLanguageMaterial = (opt) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsrcd/v1/add`,
    method: 'post',
    data: opt.data,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const updateLanguageMaterial = (opt) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsrcd/v1/mod`,
    method: 'post',
    data: opt.data,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const deleteLanguageMaterial = (opt) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsrcd/v1/del?cpsrcdId=${opt.id}`,
    method: 'get',
    data: opt,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};
