<template>
<div class="gallery container">
    
    <router-link :to="'/gallery/upload'" class="nav-link">사진 업로드</router-link>                    
</div>
</template>

<script>
export default {
    name: 'Gallery',
    mounted() {
        //this.$store.dispatch('fetchGallery');
    },
    computed: {
        gallery() {
            //return this.$store.getters.getGallery;
            return {};
        }
    }
};
</script>

<style>
</style>
