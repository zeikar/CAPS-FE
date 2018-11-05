<template>
<div class="home container">
    <h1> CAPS Homepage </h1>
    <input type="file" @change="onFileSelected" />
    <button @click="onUploadButtonClicked"></button>
</div>
</template>

<script>
import UploadService from '../service/upload';

export default {
    name: 'Test',
    data() {
        return {
            selectedFile: null
        };
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        // 파일 업로드
        onUploadButtonClicked() {
            const formData = new FormData();
            formData.append('image', this.selectedFile, this.selectedFile.name);

            UploadService.uploadImage(formData, uploadEvent => {
                    console.log('upload : ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100));
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>
