import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import RestAPI from '../constants/RestAPI';

Vue.use(Vuex);

// 화면 갱신 시 로컬 스토리지에 저장된 토큰을 axios 헤더에 설정
const enhanceAccessToken = () => {
    const accessToken = localStorage.accessToken;
    if (!accessToken) {
        return;
    }

    // expired이면 제거
    var current_time = Date.now() / 1000;
    if (jwt.decode(accessToken).exp < current_time) {
        delete localStorage.accessToken;
        return;
    }

    axios.defaults.headers.common['Access-Token'] = accessToken;
};
enhanceAccessToken();

export default new Vuex.Store({
    state: {
        // 로그인 정보
        accessToken: axios.defaults.headers.common['Access-Token'],
        // 현재 게시글 정보
        board: null,
        // 갤러리
        gallery: [],
        // 앨범
        album: null,
        // 로그인 후 넘어갈 url
        nextDestination: '/',
        // 카테고리
        boardCategories: []
    },
    getters: {
        getBoard(state) {
            return state.board;
        },
        getGallery(state) {
            return state.gallery;
        },
        getAlbum(state) {
            return state.album;
        },
        isLogined(state) {
            return state.accessToken != null && state.accessToken != undefined;
        },
        getUserData(state) {
            return jwt.decode(state.accessToken);
        },
        getNextDestination(state) {
            return state.nextDestination;
        },
        getBoardCategories(state) {
            return state.boardCategories;
        }
    },
    mutations: {
        fetchBoard(state, boardData) {
            state.board = boardData;
        },
        fetchGallery(state, galleryData) {
            state.gallery = galleryData;
        },
        fetchAlbum(state, albumData) {
            state.album = albumData;
        },
        LOGIN(state, accessToken) {
            state.accessToken = accessToken;

            // 모든 HTTP 요청 헤더에 Authorization 을 추가한다.   
            axios.defaults.headers.common['Access-Token'] = accessToken;

            // 토큰을 로컬 스토리지에 저장 
            localStorage.accessToken = accessToken;
        },
        LOGOUT(state) {
            // 토큰 정보 삭제  
            state.accessToken = null;
            delete localStorage.accessToken;
        },
        setNextDestination(state, url) {
            state.nextDestination = url;
        },
        fetchBoardCategories(state, boardCategoryData) {
            state.boardCategories = boardCategoryData;
        }
    },
    actions: {
        fetchBoard(state, boardId) {
            return axios.get(RestAPI.SERVER_DOMAIN + 'boards/view/' + boardId)
                .then(response => {
                    state.commit('fetchBoard', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        fetchGallery(state) {
            return axios.get(RestAPI.SERVER_DOMAIN + 'gallery')
                .then(response => {
                    state.commit('fetchGallery', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        fetchAlbum(state, albumId) {
            return axios.get(RestAPI.SERVER_DOMAIN + 'gallery/view/' + albumId)
                .then(response => {
                    state.commit('fetchAlbum', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        LOGIN(state, loginData) {
            return axios.post(RestAPI.SERVER_DOMAIN + 'users/login', loginData)
                .then((response) => {
                    state.commit('LOGIN', response.headers['access-token']);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        LOGOUT(state) {
            axios.defaults.headers.common['Access-Token'] = undefined;

            state.commit('LOGOUT');
        },
        setNextDestination(state, url) {
            state.commit('setNextDestination', url);
        },
        fetchBoardCategories(state) {
            return axios.get(RestAPI.SERVER_DOMAIN + 'boards/categories')
                .then(response => {
                    state.commit('fetchBoardCategories', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
    }
});