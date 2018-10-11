import Vue from 'vue'
import Router from 'vue-router'

import Board from '../components/Board.vue'
import Home from '../components/Home.vue'

Vue.use(Router)

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
        }
    ]
})