import axios from 'axios';

// Board에 관련된 axios 액션 정의
export default {
    // 게시글 작성
    writeBoard(boardData) {
        return new Promise(function (resolve, reject) {
            axios.post('http://localhost:3000/boards/', boardData)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};