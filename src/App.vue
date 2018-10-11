<template>
<div id="app">
    <Header />
    

    <Board />


    <Footer />
</div>
</template>

<script>
import Board from './components/Board.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'app',
    components: {
        Board,
        Header,
        Footer
    }
}
</script>
