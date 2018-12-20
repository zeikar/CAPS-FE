import axios from 'axios';
import RestAPI from '../constants/RestAPI';

// Board에 관련된 axios 액션 정의
export default {
    // 게시글 가져옴
    getBoards(query) {
        return axios.get(RestAPI.SERVER_DOMAIN + 'boards', {
            params: {
                category: query.category,
                search: query.search,
                page: query.page
            }
        }).catch(error => {
            console.log(error);
        });
    },
    // 게시글 작성
    writeBoard(boardData) {
        return new Promise(function (resolve, reject) {
            axios.post(RestAPI.SERVER_DOMAIN + 'boards/', boardData)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 게시글 수정
    modifyBoard(boardId, boardData) {
        return new Promise(function (resolve, reject) {
            axios.patch(RestAPI.SERVER_DOMAIN + 'boards/' + boardId, boardData)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 게시글 삭제
    deleteBoard(boardId) {
        return new Promise(function (resolve, reject) {
            axios.delete(RestAPI.SERVER_DOMAIN + 'boards/' + boardId)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};