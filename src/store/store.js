import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 로그인 정보
        accessToken: null,
        // 게시판 정보
        boards: []
    },
    getters: {
        getBoards: state => {
            return state.boards;
        }
    },
    mutations: {
        fetchBoards(state) {
            axios.get('http://localhost:3000/boards')
                .then(response => {
                    state.boards = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        LOGIN(state, accessToken) {
            state.accessToken = accessToken;
        },
        LOGOUT(state) {
            state.accessToken = null;
        }
    },
    actions: {
        LOGIN(state, loginData) {
            return axios.post('http://localhost:3000/users/login', loginData)
                .then((response) => {
                    console.log(response.headers['access-token']);
                    state.commit('LOGIN', response.headers['access-token']);
                });
        },
        LOGOUT(state) {
            state.commit('LOGOUT');
        }
    }
});