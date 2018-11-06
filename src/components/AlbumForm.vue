<template>
<div class="album-form container">
    <h3 class="text-center"> 앨범 만들기 </h3>
    <hr />
    <form v-on:submit.prevent="onSubmit">
        <InputForm v-bind:initialData="albumTitle" v-on:input="onAlbumTitleChange" name="앨범 제목" />
        <input type="file" multiple @change="onFileSelected" />
   
        <button type="submit" :disabled="isProcessing" class="btn btn-primary btn-block">
            <span v-if="isProcessing">생성 중...</span>
            <span v-else>생성</span>
        </button>
    </form>
</div>
</template>

<script>
import InputForm from './form/InputForm.vue';
import UploadService from '../service/upload';

export default {
    name: 'AlbumForm',
    data() {
        return {
            albumTitle: '',
            selectedFiles: null,

            isAlbumTitleValid: false,
            // 진행 중
            isProcessing: false
        };
    },
    methods: {        
        onAlbumTitleChange(value, valid) {
            this.albumTitle = value;
            this.isAlbumTitleValid = valid;
        },
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
        },
        onSubmit() {

            if (!(this.isAlbumTitleValid)) {
                this.$notify({
                    title: '올바르지 않은 입력이 있습니다.',
                    text: '다시 확인 후 입력해주세요.',
                    type: 'warn'
                });
                return;
            }

            this.isProcessing = true;

            const formData = new FormData();
            /*
                Iteate over any file sent over appending the files
                to the form data.
            */
            for (var i = 0; i < this.selectedFiles.length; i++) {
                let file = this.selectedFiles[i];

                formData.append('image', file);
            }
            formData.append('album_title', this.albumTitle);

            UploadService.uploadImage(formData, uploadEvent => {
                    this.msg = 'upload : ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100);
                })
                .then(() => {
                    this.$notify({
                        title: '앨범 생성 성공!',
                        text: '앨범이 성공적으로 생성 되었습니다!',
                        type: 'success'
                    });
                    this.$router.push('/gallery');
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        title: '앨범 생성 실패!',
                        text: '앨범 생성에 실패하였습니다. 입력한 정보를 다시 확인해 주세요.',
                        type: 'error'
                    });
                    this.isProcessing = false;
                });
        }
    },
    components: {
        InputForm
    }
};
</script>

<style>
</style>
