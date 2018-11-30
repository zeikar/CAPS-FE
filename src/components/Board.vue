<template>
<div class="board container">
    <table class="table table-hover">
        <thead>
            <tr>
                <th>No.</th>
                <th>제목</th>
                <th>카테고리</th>
                <th>작성자</th>
                <th>작성일</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(board, index) in boards" v-bind:key="board._id">
                <td>{{ boards.length - index }}</td>
                <td>
                    <a href="javascript:void(0)" @click="boardClick(board._id)">{{ board.board_title }}</a>
                </td>
                <td>
                    <router-link :to="'/board?category=' + board.category._id">{{ board.category.category_name }}</router-link>
                </td>
                <td>
                    <router-link :to="'/profile/' + board.user.user_id">{{ board.user.user_name }}</router-link>
                </td>
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
        this.fetchBoards();
    },
    methods: {
        fetchBoards() {
            if (this.$route.query.category) {
                this.$store.dispatch('fetchBoardsCategory', this.$route.query.category);
            } else {
                this.$store.dispatch('fetchBoards');
            }
        },
        boardClick(boardId) {
            let nextDestination = '/board/view/' + boardId;
            // 로그인 체크
            if (!this.$store.getters.isLogined) {
                this.$notify({
                    title: '로그인 필요',
                    text: '게시글을 보시려면 로그인이 필요합니다. 로그인해 주세요.',
                    type: 'warn'
                });
                this.$store.dispatch('setNextDestination', nextDestination).then(() => this.$router.push('/login'));

                return;
            }
            this.$router.push(nextDestination);
        }
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
