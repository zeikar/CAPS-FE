<template>
<div id="app">
    <Header />
    <AlertMessage />
    <router-view />
    <Footer />
</div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import AlertMessage from './components/common/AlertMessage.vue';

export default {
    name: 'app',
    components: {
        Header,
        AlertMessage,
        Footer
    }
};
</script>
