import  { jwtServerInstance }  from '../index'
import {getTokenUser,getJwtToken} from "@/lib/utils";
import qs from	'qs'

//JWT登录认证接口
export const login = (userName,passWord) => {
  return jwtServerInstance.request({
    url:'/login',
    method:'post',
    data:{
      phone: userName,
      pwd: passWord,
      "code": "1234"
    },
    headers:{

    }
  })
}
//JWT令牌刷新接口
export const refreshToken = () => {
  return jwtServerInstance.request({
    url:'/refreshtoken',
    method:'get',
    headers:{
      token:getJwtToken()
    }
  })
}

//获取用户信息接口(个人中心)
export const getUserInfo = () => {
  return jwtServerInstance.request({
    url:'/system/sysuser/info',
    method:'get',
    headers:{
      token:getJwtToken()
    },
    params:{
      username: getTokenUser()
    }
  })
}


//=====================用户管理接口开始========================
//用户列表查询接口
export const getUsers = (queryform,pagination) => {
  return jwtServerInstance.request({
    url:'/system/sysuser/query',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      orgId: queryform.orgId,
      // username: queryform.username,
      //目前phone就是username
      phone: queryform.phone,
      email: queryform.email,
      enabled: queryform.enabled,
      // createStartTime: queryform.timeRange[0],
      // createEndTime: queryform.timeRange[1],
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })
  })
}

//更新sys_user的一条数据记录
export const updateUser = (userForm) => {
  return jwtServerInstance.request({
    url:'/system/sysuser/update',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:userForm
  })
}

//新增一条sys_user数据记录
export const addUser = (userForm) => {
  return jwtServerInstance.request({
    url:'/system/sysuser/add',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:userForm
  })
}

//删除一条sys_user数据记录
export const deleteUser = (accountNo) => {
  return jwtServerInstance.request({
    url:'/system/sysuser/delete',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      accountNo:accountNo
    })
  })
}

//sys_user数据记录的enabled字段
export const changeEnabled = (username,enabled) => {
  return jwtServerInstance.request({
    url:'/system/sysuser/enabled/change',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      username,
      enabled
    })
  })
}

//重置用户密码
export const resetUserPwd = (username) => {
  return jwtServerInstance.request({
    url:'/system/sysuser/pwd/reset',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      username
    })
  })
}

//判断当前用户是否仍在使用默认密码，没做修改
export const pwdIsDefault = () => {
  return jwtServerInstance.request({
    url:'/system/sysuser/pwd/isdefault',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      username:getTokenUser()
    })
  })
}


//修改密码
export const changeUserPwd = (oldPass,newPass) => {
  return jwtServerInstance.request({
    url:'/system/sysuser/pwd/change',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      username:getTokenUser(),
      oldPass:oldPass,
      newPass:newPass
    })
  })
}


//新增一条sys_user数据记录
export const registerUser = (userForm) => {
  return jwtServerInstance.request({
    url:'/api/user/v1/register',
    method:'post',
    data:userForm
  })
}


