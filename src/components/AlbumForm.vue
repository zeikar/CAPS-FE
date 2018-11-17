<template>
<div class="album-form container">
    <h3 class="text-center"> 앨범 만들기 </h3>
    <hr />
    <form v-on:submit.prevent="onSubmit">
        <InputForm v-bind:initialData="albumTitle" v-on:input="onAlbumTitleChange" name="앨범 제목" />
        <div class="custom-file">
            <input type="file" accept="image/*"  class="custom-file-input" id="customFileLang" multiple @change="onFileSelected" />
            <label class="custom-file-label" for="customFileLang">
                <span v-if="selectedFiles==null">앨범의 사진을 선택하세요.</span>
                <span v-else>사진 {{selectedFiles.length}}개 선택됨.</span>
            </label>
        </div>
        <div class="row">
            <div v-for="(file, key) in selectedFiles" v-bind:key="key" class="col-sm-3">
                {{ file.name }}
                <img class="img-thumbnail" v-bind:ref="'image'+parseInt( key )"/>
            </div>
        </div>

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

            this.getImagePreviews();
        },
        getImagePreviews(){
        /*
          Iterate over all of the files and generate an image preview for each one.
        */
        for( let i = 0; i < this.selectedFiles.length; i++ ){
          /*
            Ensure the file is an image file
          */
          if ( /\.(jpe?g|png|gif)$/i.test( this.selectedFiles[i].name ) ) {
            /*
              Create a new FileReader object
            */
            let reader = new FileReader();

            /*
              Add an event listener for when the file has been loaded
              to update the src on the file preview.
            */
            reader.addEventListener('load', function(){
              this.$refs['image'+parseInt( i )][0].src = reader.result;
            }.bind(this), false);

            /*
              Read the data for the file in through the reader. When it has
              been loaded, we listen to the event propagated and set the image
              src to what was loaded from the reader.
            */
            reader.readAsDataURL( this.selectedFiles[i] );
          }
        }
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
