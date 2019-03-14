import Vue from 'vue';
import Router from 'vue-router';
// import Func from '@/views/func/Func.vue';

Vue.use(Router);

export const appRouter = [{
        path: '*', //*号表示匹配任意内容
        title: '404',
        component: resolve => {
            require(['@/views/error/Error.vue'], resolve);
        }
    },
    {
        path: '/',
        name: 'test',
        component: resolve => {
            require(['@/views/test/Test.vue'], resolve);
        }
    },
    // {
    //     path: '/qa',
    //     component: Func,
    //     children: [{
    //         path: '',
    //         name: 'qa',
    //         component: resolve => {
    //             require(['@/views/qa/Qa.vue'], resolve);
    //         }
    //     }]
    // }
]

let route = new Router({
    mode: 'history',
    routes: appRouter
});

/* route.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !auth.isLogin()) {
        next('/login');
    } else {
        next();
    }
}); */

export default route