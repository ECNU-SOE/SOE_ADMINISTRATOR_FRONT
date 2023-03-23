import {jwtServerInstance} from "../index";
import {getJwtToken, getTokenUser} from "@/lib/utils";
import qs from	'qs'

//=====================菜单管理接口开始========================
//完整菜单树形列表接口
export const getMenuTree = (menuQueryForm) => {
  return jwtServerInstance.request({
    url:'/system/sysmenu/tree',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      menuNameLike:menuQueryForm.name,
      menuStatus: menuQueryForm.status
    })
  })
}

//更新菜单的一条数据记录
export const updateMenu = (menuForm) => {
  return jwtServerInstance.request({
    url:'/system/sysmenu/update',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:menuForm
  })
}

//新增一条菜单数据记录
export const addMenu = (menuForm) => {
  return jwtServerInstance.request({
    url:'/system/sysmenu/add',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:menuForm
  })
}

//删除一条菜单数据记录
export const deleteMenu = (menuForm) => {
  return jwtServerInstance.request({
    url:'/system/sysmenu/delete',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:menuForm
  })
}

//更新菜单的禁用状态
export const changeMenuStatus = (menuId,status) => {
  return jwtServerInstance.request({
    url:'/system/sysmenu/status/change',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      menuId,
      status
    })
  })
}


//更新菜单的禁用状态
export const changeMenuHidden = (menuId,hidden)  => {
  return jwtServerInstance.request({
    url:'/system/sysmenu/hidden/change',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      menuId,
      hidden
    })
  })
}


//角色管理->分配菜单权限：获取菜单树形结构数据（带勾选节点和默认展开节点）
export const getMenuCheckedTree = (roleId) => {
  return jwtServerInstance.request({
    url:'/system/sysmenu/checkedtree',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      roleId:roleId
    })
  })
}

//角色管理->分配菜单权限：保存菜单树勾选节点(checkedIds是一个数字型数组)
export const saveMenuCheckedKeys = (roleId,checkedIds) => {
  return jwtServerInstance.request({
    url:'/system/sysmenu/savekeys',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:{
      roleId:roleId,
      checkedIds:checkedIds
    }
  })
}

//根据登录用户名加载该用户可以访问的菜单
export const getMenuTreeByUsername = () => {
  return jwtServerInstance.request({
    url:'/system/sysmenu/tree/user',
    method:'post',
    headers:{
      token:getJwtToken()
    },
    data:qs.stringify({
      username:getTokenUser()
    })
  })
}