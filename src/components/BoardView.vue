<template>
<div class="container" v-if="board && board._id == boardId">
    <div class="post-heading">
        <div class="row">
            <div class="col-md-7 col-sm-12">
                <h2> {{ board.board_title }} </h2>
            </div>
            <div class="col-md-2 col-sm-6">
                <p> <span class="badge badge-primary">By</span> <a class="colored_name10" href="/profile/admin">{{ board.user.user_name }}</a> </p>
            </div>
            <div class="col-md-3 col-sm-6">
                <p> <span class="badge badge-primary">At</span> <a href="#stay_here" data-toggle="tooltip" title="" data-original-title="">{{ board.updated_at }}</a> </p>
            </div>
        </div>
    </div>

    <div class="post-content">
        {{ board.board_content }}
    </div>

    <div class="post-buttons">
        <div class="row">
            <div class="col-sm-2">
                <a href="../../forum/modify/?id=377" class="btn btn-warning btn-block" role="button">글 수정</a>
            </div>
            <div class="col-sm-8"></div>
            <div class="col-sm-2">
                <button class="btn btn-danger btn-block" role="button" @click="deleteBoard()">글 삭제</button>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import BoardService from '../service/board';

export default {
    name: 'BoardView',
    props: ['boardId'],
    mounted() {
        this.$store.dispatch('fetchBoard', this.boardId);
    },
    methods: {
        deleteBoard() {
            BoardService.deleteBoard(this.boardId);

            this.$notify({
                title: '게시글 삭제 성공!',
                text: '게시글이 성공적으로 삭제 되었습니다!',
                type: 'success'
            });
            this.$router.push('/board/');
        }
    },
    computed: {
        board() {
            return this.$store.getters.getBoard;
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
