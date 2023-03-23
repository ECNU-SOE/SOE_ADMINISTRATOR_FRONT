import {newJwtServerInstance} from "../index";
export const showAllLanguageMaterialGroup = (opt) => {
  return newJwtServerInstance.request({
    // corpus-server
    url: `/corpus-server/api/cpsgrp/v1/list?cur=1&size=22`,
    method: 'post',
    data: opt,
    params:{}
  });
};

export const deleteLanguageMaterialGroup = (opt) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsgrp/v1/del?cpsgrpId=${opt.id}`,
    method: 'get',
    data: opt,
    params:{},
    headers:{
      token:opt.token
    }
  });
};

export const getCurrentLanguageMaterialGroup = (opt) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsgrp/v1/detail?cpsgrpId=${opt.id}`,
    method: 'get',
    data: opt,
    params:{}
  });
};

export const getLanguageMaterial = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/corpus/v1/list?cur=1&size=100`,
    method: 'post',
    data: query,
    params:{}
  });
};
