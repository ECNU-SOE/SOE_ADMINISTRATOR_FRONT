import {jwtServerInstance} from "../index";
import qs from	'qs'
import {getJwtToken} from "@/lib/utils";

//=====================角色管理接口开始========================
//角色列表查询接口
export const getRoles = (roleLike) => {
  return jwtServerInstance.request({
    url:'/system/sysrole/query',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      roleLike:roleLike
    })
  })
}

//更新sys_role的一条数据记录
export const updateRole = (roleForm) => {
  return jwtServerInstance.request({
    url:'/system/sysrole/update',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:roleForm
  })
}

//新增一条sys_role数据记录
export const addRole = (roleForm) => {
  return jwtServerInstance.request({
    url:'/system/sysrole/add',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:roleForm
  })
}

//删除一条sys_role数据记录
export const deleteRole = (roleId) => {
  return jwtServerInstance.request({
    url:'/system/sysrole/delete',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      roleId:roleId
    })
  })
}


//更新角色的禁用状态
export const changeRoleStatus = (roleId,status) => {
  return jwtServerInstance.request({
    url:'/system/sysrole/status/change',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      roleId,
      status
    })
  })
}

//获取被勾选的角色和所有角色列表
export const getCheckedRoles = (accountNo) => {
  return jwtServerInstance.request({
    url:'/system/sysrole/checkedroles',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      accountNo:accountNo
    })
  })
}
//保存用户角色(实际是用户管理的功能)
export const saveCheckedUserRoles = (accountNo,checkedIds) => {
  return jwtServerInstance.request({
    url:'/system/sysrole/savekeys',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:{
      accountNo:accountNo,
      checkedIds:checkedIds
    }
  })
}