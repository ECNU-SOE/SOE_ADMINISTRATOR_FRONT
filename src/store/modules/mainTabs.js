import {getMenuTreeByUsername} from '../../api/menu.js'
import router from "../../router/index.js"
import systemRoutes from '../../router/modules/menu.js'

const HOME_PAGE = "/home"
const FIRST_PAGE = "/dashboard"
const state = {
    //存放{ route: 路由路径, name: tab显示名称}对象数组
    mainTabs:[{route: FIRST_PAGE, name: "首页",closable:false}],
    //当前被激活显示的那个Tab内容对应的route
    activeRoute: FIRST_PAGE,
    //当前激活的Tab的功能名称
    activeTabName:"",
    menuList:[

    ]

}
const actions = {
    addTab({state,commit},route){
        let token = 'soe-token-eyJhbGciOiJIUzI1NiJ9.eyJsb2dpblVzZXIiOnsiYWNjb3VudE5vIjoidXNlcl8xNjAxODQ0ODU0Nzk3NzY2NjU2IiwiaWRlbnRpZnlJZCI6bnVsbCwicm9sZUlkIjpudWxsLCJuaWNrTmFtZSI6Ikpvc2h1YSIsInJlYWxOYW1lIjoi5p2D6ZmQ6K6k6K-B5rWL6K-V6LSm5Y-3IiwiZmlyc3RMYW5ndWFnZSI6bnVsbCwicGhvbmUiOiIxMzU3Njg0NTM1NCIsIm1haWwiOiIxNzY1OTQ3NDI0QHFxLmNvbSJ9LCJpYXQiOjE2NzE3MTgzMTYsImV4cCI6MTY3MTcyMTkxNn0.KxBUo4BopmvkEW9Qr5CviJF6BLX8elzNoAjJplQFJXo';
        getMenuTreeByUsername({token,url:"http://localhost:8001/"}).then(res => {
            state.menuList = res.data
            commit("addTabMutation",route);
        })
    }
}
const mutations = {
    //加载后台菜单数据之后调用该方法
    addTabMutation(state, route) {
        //维护主界面Tab信息（从菜单数据中获取）
        let isAlreadyIn =
            state.maintabs.some(item => item.route === route)
        this.commit("findMenuNameByRoute",route);
        state.activeRoute = route;
        if(!isAlreadyIn && state.activeTabName !== ""){
            state.maintabs.push({route:route,name:state.activeTabName});
        }

        //重点从这里开始
        let loadedRoutes = []; //动态加载的前端路由初始化
        //将菜单转换为路由
        menuToRoutes(state.menuList,loadedRoutes)
        //固定路由与动态加载的前端路由进行组合
        for(let i in systemRoutes){
            if(systemRoutes[i].path === HOME_PAGE){
                systemRoutes[i].children = loadedRoutes
            }
        }
        //最后让路由生效
        router.$addRoutes(systemRoutes)
    },
    removeTab(state, route){
        if(route !== FIRST_PAGE){
            state.maintabs = state.maintabs.filter(
                item => item.route !== route
            )
            state.activeRoute = state.maintabs[state.maintabs.length-1].route
        }
    },
    findMenuNameByRoute(state, route){
        let findOne;
        for(let i in state.menuList){
            let tmpArr = state.menuList[i].children.filter(
                item => item.path === route
            )
            if(tmpArr.length > 0) {
                findOne = tmpArr[0]
                break;
            }
        }
        state.activeTabName = findOne?findOne.name:"";
    }
}
const getters = {

}

//将菜单转换为前端路由
function menuToRoutes(menuList,loadedRoutes){
    for(let i in menuList){
        menuList[i].children.forEach(item => {
            if(item.isLeaf){  //为权限菜单中的叶子节点，添加前端路由
                loadedRoutes.push({
                    path: item.url.replace(HOME_PAGE + "/",""),
                    name: item.url.replace(HOME_PAGE + "/",""),
                    component: resolve => {
                        require(["@/views/" + item.viewImport ], resolve)
                    }
                })
            }else{
                //递归处理菜单树形结构
                menuToRoutes(item.children,loadedRoutes);
            }
        })
    }
}

export default {
    state,actions,mutations,getters
}
