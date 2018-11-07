<template>
<div class="gallery container">
    <div class="row">
        <div class="col-sm-4 col-xs-12 img-wrapper" v-for="album in gallery" v-bind:key="album._id">
            <div class="card">
                <img class="card-img-top" :alt="album.album_title" :src="getPhotoUrl(album.photos[0]._id)" >
                <div class="card-body">
                    <h4 class="card-title">
                        <router-link :to="'/gallery/view/'+album._id">{{ album.album_title }}</router-link>
                    </h4>
                    <p class="card-text">{{ album.created_at }}</p>
                    <a href="#" class="btn btn-primary">좋아요!</a>
                </div>
            </div>
        </div>
    </div>
    <router-link :to="'/gallery/upload'" class="btn btn-outline-primary">앨범 생성</router-link>
</div>
</template>

<script>
import RestAPI from '../constants/RestAPI';

export default {
    name: 'Gallery',
    mounted() {
        this.$store.dispatch('fetchGallery');
    },
    methods: {
        getPhotoUrl(photoId) {
            return RestAPI.GET_PHOTO + photoId;
        }
    },
    computed: {
        gallery() {
            return this.$store.getters.getGallery;
        }
    }
};
</script>

<style>
</style>
