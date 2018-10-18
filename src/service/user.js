import axios from 'axios';

// User에 관련된 axios 액션 정의
export default {
    checkUserId(userId) {
        return new Promise(function (resolve, reject) {
            axios.get('http://localhost:3000/users/check/' + userId)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};