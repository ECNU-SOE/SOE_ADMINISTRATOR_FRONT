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

export const updateCurrentLanguageMaterialGroup = (opt) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsgrp/v1/update`,
    method: 'post',
    data: opt,
    params:{}
  });
};

export const addCurrentLanguageMaterialGroup = (opt) => {
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

export const getLanguageMaterial = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/corpus/v1/list?cur=1&size=100`,
    method: 'post',
    data: query,
    params:{}
  });
};

export const addTopicInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/topic/v1/add`,
    method: 'post',
    data: query,
    params:{}
  });
};

export const getTopicInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/topic/v1/detail?topicId=${query.id}`,
    method: 'get',
    data: query,
    params:{}
  });
};

export const updateTopicInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/topic/v1/update`,
    method: 'post',
    data: query,
    params:{}
  });
};

export const deleteTopicInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/topic/v1/del?topicId=${query.id}`,
    method: 'get',
    data: query,
    params:{}
  });
};

export const addCpsrcdInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsrcd/v1/add`,
    method: 'post',
    data: query,
    params:{}
  });
};

export const updateCpsrcdInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsrcd/v1/mod`,
    method: 'post',
    data: query,
    params:{}
  });
};

export const deleteCpsrcdInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsrcd/v1/del?cpsrcdId=${query.id}`,
    method: 'get',
    data: query,
    params:{}
  });
};

