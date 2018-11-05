<template>
<div class="gallery container">
    <table class="table table-hover">
        <thead>
            <tr>
                <th>No.</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(album, index) in gallery" v-bind:key="album._id">
                <td>{{ index + 1 }}</td>
                <td>
                    <router-link :to="'/board/view/'+album._id" class="nav-link">{{ album.album_title }}</router-link>                    
                </td>
                <td>{{ album.user.user_name }}</td>
                <td>{{ album.updated_at }}</td>
            </tr>
        </tbody>
    </table>
    <router-link :to="'/gallery/upload'" class="nav-link">사진 업로드</router-link>                    
</div>
</template>

<script>
export default {
    name: 'Gallery',
    mounted() {
        this.$store.dispatch('fetchGallery');
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
