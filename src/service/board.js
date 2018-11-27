import axios from 'axios';
import RestAPI from '../constants/RestAPI';

// Board에 관련된 axios 액션 정의
export default {
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
    }
};