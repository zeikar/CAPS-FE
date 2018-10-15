<template>
<div id="app">
    <Header />
    <AlertMessage msg="Welcome to Your Vue.js App"/>
    <router-view />
    <Footer />
</div>
</template>

<script>
import Header from './components/Header.vue';
import AlertMessage from './components/common/AlertMessage.vue';
import Footer from './components/Footer.vue';

export default {
    name: 'app',
    components: {
        Header,
        AlertMessage,
        Footer
    }
};
</script>
