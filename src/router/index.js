import {createRouter, createWebHashHistory} from "vue-router";
import routes from'./modules/menu.js';
import store from '../store/index.js'


const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

router.afterEach((to,from) => {
    if(to.name && to.name.toLocaleLowerCase() !== 'login'){
        store.dispatch('addTab',to.path)
    }
})



export default router;