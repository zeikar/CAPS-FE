<template>
<div class="board container">
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
            <tr v-for="(board, index) in boards" v-bind:key="board._id">
                <td>{{ index + 1 }}</td>
                <td>
                    <router-link :to="'/board/view/'+board._id">{{ board.board_title }}</router-link>                    
                </td>
                <td>{{ board.user.user_name }}</td>
                <td>{{ board.updated_at }}</td>
            </tr>
        </tbody>
    </table>
    <router-link :to="'/board/write'" class="btn btn-outline-primary">글쓰기</router-link>                    
</div>
</template>

<script>
export default {
    name: 'Board',
    mounted() {
        this.$store.dispatch('fetchBoards');
    },
    computed: {
        boards() {
            return this.$store.getters.getBoards;
        }
    }
};
</script>

<style>
</style>
