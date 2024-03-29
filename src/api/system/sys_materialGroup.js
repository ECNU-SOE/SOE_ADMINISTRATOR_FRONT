import {newJwtServerInstance} from "../index";
import {getJwtToken} from "@/lib/utils";
export const showAllLanguageMaterialGroup = (opt) => {
  return newJwtServerInstance.request({
    // corpus-server
    url: `/corpus-server/api/cpsgrp/v1/list?cur=${opt.cur||1}&size=${opt.size || 22}`,
    method: 'post',
    data: opt,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const deleteLanguageMaterialGroup = (opt) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsgrp/v1/del?cpsgrpId=${opt.id}`,
    method: 'get',
    data: opt,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const getCurrentLanguageMaterialGroup = (opt) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsgrp/v1/detail?cpsgrpId=${opt.id}`,
    method: 'get',
    data: opt,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const updateCurrentLanguageMaterialGroup = (opt) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsgrp/v1/update`,
    method: 'post',
    data: opt,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const addCurrentLanguageMaterialGroup = (opt) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/cpsgrp/v1/create`,
    method: 'post',
    data: opt,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const getLanguageMaterial = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/corpus/v1/list?cur=1&size=100`,
    method: 'post',
    data: query,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const addTopicInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/topic/v1/add`,
    method: 'post',
    data: query,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const getTopicInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/topic/v1/detail?topicId=${query.id}`,
    method: 'get',
    data: query,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const updateTopicInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/topic/v1/update`,
    method: 'post',
    data: query,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const deleteTopicInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/topic/v1/del?topicId=${query.id}`,
    method: 'get',
    data: query,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const addCpsrcdInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/topic_cps/v1/add`,
    method: 'post',
    data: query,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const updateCpsrcdInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/topic_cps/v1/mod`,
    method: 'post',
    data: query,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const deleteCpsrcdInterface = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/topic_cps/v1/del`,
    method: 'post',
    data: query,
    params:{},
    headers:{
      token:getJwtToken()
    }
  });
};

export const saveAudio = (query) => {
  return newJwtServerInstance.request({
    url: `/corpus-server/api/file/v1/upload`,
    method: 'post',
    data: query,
    params:query,
    headers:{
      token:getJwtToken()
    }
  });
};


