import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        boards: []
    },
    getters: {
        getBoards: state => {
            return state.boards
        }
    },
    mutations: {
        fetchBoards: (state) => {
            axios.get('http://localhost:3000/boards')
            .then(response => {
                state.boards = response.data;
            })
            .catch(error => {
                state.boards = [error];
            });
        }
    }
})