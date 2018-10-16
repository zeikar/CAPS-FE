import Vue from 'vue';
import Router from 'vue-router';

import Board from '../components/Board.vue';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import BoardView from '../components/BoardView.vue';
import NoAuth from '../components/NoAuth.vue';
import PageNotFound from '../components/PageNotFound.vue';

import store from '../store/store';

Vue.use(Router);

const requireAuth = () => (from, to, next) => {
    if (store.getters.isLogined) return next(); // isAuth === true면 페이지 이동
    next('/noauth'); // isAuth === false면 다시 로그인 화면으로 이동
};

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/board',
            name: 'Board',
            component: Board
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/board/view/:boardId',
            component: BoardView,
            beforeEnter: requireAuth(),
            props: true
        },
        {
            path: '/noauth',
            name: 'NoAuth',
            component: NoAuth
        },
        {
            path: '*',
            name: 'PageNotFound',
            component: PageNotFound
        }
    ]
});