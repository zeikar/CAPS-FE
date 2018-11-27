import axios from 'axios';
import RestAPI from '../constants/RestAPI';

// User에 관련된 axios 액션 정의
export default {
    // 사진 업로드
    uploadImage(formData, onUploadProgressCallback) {
        return new Promise(function (resolve, reject) {
            axios.post(RestAPI.SERVER_DOMAIN + 'gallery', formData, {
                    onUploadProgress: onUploadProgressCallback,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};