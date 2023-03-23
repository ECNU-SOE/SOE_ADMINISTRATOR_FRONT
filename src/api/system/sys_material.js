import {newJwtServerInstance} from "../index";

export const getLanguageMaterial = (query) => {
  // corpus-server
  return newJwtServerInstance.request({
    url: `/corpus-server/api/corpus/v1/list?cur=1&size=100`,
    method: 'post',
    data: query,
    params:{}
  });
};

export const addLanguageMaterial = (opt) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/corpus/v1/add`,
    method: 'post',
    data: opt.data,
    params:{},
    headers:{
      token:opt.token
    }
  });
};

export const addLanguageMaterialGroup = (opt) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsgrp/v1/create`,
    method: 'post',
    data: opt,
    params:{},
    headers:{
      token:opt.token
    }
  });
};
