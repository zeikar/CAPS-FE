<template>
<div class="container" v-if="album && album._id == albumId">
    <div class="post-heading">
        <div class="row">
            <div class="col-md-7 col-sm-12">
                <h2> {{ album.album_title }} </h2>
            </div>
            <div class="col-md-2 col-sm-6">
                <p> <span class="badge badge-primary">By</span> <a class="colored_name10" :href="'/profile/' + album.user.user_id">{{ album.user.user_name }}</a> </p>
            </div>
            <div class="col-md-3 col-sm-6">
                <p> <span class="badge badge-primary">At</span> <a href="#stay_here" data-toggle="tooltip" title="" data-original-title="">{{ album.updated_at }}</a> </p>
            </div>
        </div>
    </div>

    <div class="post-content">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>제목</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(photo, index) in album.photos" v-bind:key="photo._id">
                    <td>{{ index + 1 }}</td>                    
                    <td> <img :src="'http://localhost:3000/gallery/photo/' + photo._id"> </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="post-buttons">
        <div class="row">
            <div class="col-sm-2">
                <a href="../../forum/modify/?id=377" class="btn btn-warning btn-block" role="button">글 수정</a>
            </div>
            <div class="col-sm-8"></div>
            <div class="col-sm-2">
                <a href="../../forum/delete/?id=377" class="btn btn-danger btn-block" role="button" onclick="return Delete_Confirm()">글 삭제</a>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: 'AlbumView',
    props: ['albumId'],
    mounted() {
        this.$store.dispatch('fetchAlbum', this.albumId);
    },
    computed: {
        album() {
            return this.$store.getters.getAlbum;
        }
    }
};
</script>

<style>
.post-heading {
    border-bottom: 1px solid #cccccc;
}

.post-heading h2 {
    margin-top: 0px;
}

.post-content {
    border-bottom: 1px solid #cccccc;
}
</style>
