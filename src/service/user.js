import axios from 'axios';

// User에 관련된 axios 액션 정의
export default {
    // 아이디 중복 체크
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
    },

    // 회원 가입
    registerUser(userData) {
        return new Promise(function (resolve, reject) {
            axios.post('http://localhost:3000/users/signup', userData)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // 아이디 중복 체크
    getUserData(userId) {
        return new Promise(function (resolve, reject) {
            axios.get('http://localhost:3000/users/' + userId)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};