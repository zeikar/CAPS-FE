import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import jwt from 'jsonwebtoken';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 로그인 정보
        accessToken: null,
        // 게시판 정보
        boards: []
    },
    getters: {
        getBoards(state) {
            return state.boards;
        },
        isLogined(state) {
            return state.accessToken != null && state.accessToken != undefined;
        },
        getUserData(state) {
            return jwt.decode(state.accessToken);
        }
    },
    mutations: {
        fetchBoards(state, boardsData) {
            state.boards = boardsData;
        },
        LOGIN(state, accessToken) {
            state.accessToken = accessToken;
        },
        LOGOUT(state) {
            state.accessToken = null;
        }
    },
    actions: {
        fetchBoards(state) {
            axios.get('http://localhost:3000/boards')
            .then(response => {
                state.commit('fetchBoards', response.data);
            })
            .catch(error => {
                console.log(error);
            });
        },
        LOGIN(state, loginData) {
            return axios.post('http://localhost:3000/users/login', loginData)
                .then((response) => {
                    state.commit('LOGIN', response.headers['access-token']);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        LOGOUT(state) {
            state.commit('LOGOUT');
        }
    }
});