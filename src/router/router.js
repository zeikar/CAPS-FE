import Vue from 'vue';
import Router from 'vue-router';

import Board from '../components/Board.vue';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import BoardView from '../components/BoardView.vue';
import BoardForm from '../components/BoardForm.vue';
import Profile from '../components/Profile.vue';
import Gallery from '../components/Gallery.vue';
import AlbumForm from '../components/AlbumForm.vue';
import Test from '../components/Test.vue';
import NoAuth from '../components/NoAuth.vue';
import PageNotFound from '../components/PageNotFound.vue';

import store from '../store/store';

Vue.use(Router);

const requireAuth = () => (from, to, next) => {
    if (store.getters.isLogined) return next(); // isAuth === true면 페이지 이동
    next('/noauth'); // isAuth === false면 다시 로그인 화면으로 이동
};

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'CAPS',
            component: Home
        },
        {
            path: '/board',
            name: '게시판',
            component: Board
        },
        {
            path: '/login',
            name: 'CAPS 로그인',
            component: Login
        },
        {
            path: '/register',
            name: 'CAPS 회원 가입',
            component: Register
        },
        {
            path: '/board/view/:boardId',
            name: '게시글 보기',
            component: BoardView,
            beforeEnter: requireAuth(),
            props: true
        },
        
        {
            path: '/board/write',
            name: '글 쓰기',
            component: BoardForm,
            beforeEnter: requireAuth(),
            props: true
        },
        {
            path: '/profile',
            name: '내 프로필',
            component: Profile
        },
        {
            path: '/profile/:userId',
            name: '프로필',
            component: Profile,
            props: true
        },
        {
            path: '/gallery',
            name: '갤러리',
            component: Gallery
        },
        {
            path: '/gallery/upload',
            name: '앨범 만들기',
            component: AlbumForm,
            beforeEnter: requireAuth(),
            props: true
        },
        {
            path: '/test',
            name: '테스트',
            component: Test
        },
        {
            path: '/noauth',
            name: '권한 필요!',
            component: NoAuth
        },
        {
            path: '*',
            name: '404 Not Found',
            component: PageNotFound
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.name;
    next();
});

export default router;