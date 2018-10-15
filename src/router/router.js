import Vue from 'vue';
import Router from 'vue-router';

import Board from '../components/Board.vue';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import PageNotFound from '../components/PageNotFound.vue';

Vue.use(Router);

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
            path: '*',
            name: 'PageNotFound',
            component: PageNotFound
        }
    ]
});