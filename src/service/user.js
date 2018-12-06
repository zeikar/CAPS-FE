import axios from 'axios';
import RestAPI from '../constants/RestAPI';

// User에 관련된 axios 액션 정의
export default {
    // 아이디 중복 체크
    checkUserId(userId) {
        return axios.get(RestAPI.SERVER_DOMAIN + 'users/check/' + userId)
            .catch(error => {
                console.log(error);
            });
    },

    // 회원 가입
    registerUser(userData) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'users/signup', userData)
            .catch(error => {
                console.log(error);
            });
    },

    // 아이디에 해당하는 사용자 데이터를 가져옴.
    getUserData(userId) {
        return axios.get(RestAPI.SERVER_DOMAIN + 'users/' + userId)
            .catch(error => {
                console.log(error);
            });
    },

    // 수정
    editUserData(userData) {
        return axios.patch(RestAPI.SERVER_DOMAIN + 'users', userData)
            .catch(error => {
                console.log(error);
            });
    }
};