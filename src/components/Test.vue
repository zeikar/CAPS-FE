<template>
<div class="home container">
    <h1> {{msg}} </h1>
    <input type="file" multiple @change="onFileSelected" />
    <button @click="onUploadButtonClicked"></button>
</div>
</template>

<script>
import UploadService from '../service/upload';

export default {
    name: 'Test',
    data() {
        return {
            selectedFiles: null,
            msg: 'Hello'
        };
    },
    methods: {
        onFileSelected(event) {
            this.selectedFiles = event.target.files;
        },
        // 파일 업로드
        onUploadButtonClicked() {
            const formData = new FormData();

            /*
                Iteate over any file sent over appending the files
                to the form data.
            */
            for (var i = 0; i < this.selectedFiles.length; i++) {
                let file = this.selectedFiles[i];

                formData.append('image', file);
            }

            UploadService.uploadImage(formData, uploadEvent => {
                    this.msg = 'upload : ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100);
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
