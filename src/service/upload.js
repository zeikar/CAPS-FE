import axios from 'axios';

// User에 관련된 axios 액션 정의
export default {
    // 사진 업로드
    uploadImage(formData, onUploadProgressCallback) {
        return new Promise(function (resolve, reject) {
            axios.post('http://localhost:3000/gallery', formData, {
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