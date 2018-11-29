<template>
<div class="gallery container">
    <div class="row">
        <div class="col-sm-4 col-xs-12 img-wrapper" v-for="album in gallery" v-bind:key="album._id">
            <div class="card">
                <img class="card-img-top" :alt="album.album_title" :src="getPhotoUrl(album.photos[0]._id)" >
                <div class="card-body">
                    <h4 class="card-title">
                        <a href="#" data-toggle="modal" @click="albumClick(album._id)"
                            data-target="#albumModal">{{ album.album_title }}</a>
                    </h4>
                    <p class="card-text">{{ album.created_at }}</p>
                    <a href="#" class="btn btn-primary">좋아요!</a>
                </div>
            </div>
        </div>
    </div>
    <AlbumView v-if="chosenAlbumId!=''&&showModal" v-bind:albumId="chosenAlbumId" v-on:closeModal="closeModal" />
    <router-link :to="'/gallery/upload'" class="btn btn-outline-primary">앨범 생성</router-link>
</div>
</template>

<script>
import AlbumView from './AlbumView.vue';
import RestAPI from '../constants/RestAPI';

export default {
    name: 'Gallery',
    data() {
        return {
            chosenAlbumId: '',
            showModal: false
        };
    },
    mounted() {
        this.$store.dispatch('fetchGallery');
    },
    methods: {
        getPhotoUrl(photoId) {
            return RestAPI.GET_PHOTO + photoId;
        },
        albumClick(albumId) {
            let nextDestination = '/gallery/';
            // 로그인 체크
            if (!this.$store.getters.isLogined) {
                this.$notify({
                    title: '로그인 필요',
                    text: '앨범을 보시려면 로그인이 필요합니다. 로그인해 주세요.',
                    type: 'warn'
                });
                this.$store.dispatch('setDestination', nextDestination).then(() => this.$router.push('/login'));

                return;
            }

            this.chosenAlbumId = albumId;

            this.openModal();
        },
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        }
    },
    computed: {
        gallery() {
            return this.$store.getters.getGallery;
        }
    },
    components: {
        AlbumView
    }
};
</script>

<style>
</style>
