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
                <a href="../../forum/delete/?id=377" class="btn btn-danger btn-block" role="button" onclick="return Delete_Confirm()">글 삭제</a>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: 'BoardView',
    props: ['boardId'],
    mounted() {
        this.$store.dispatch('fetchBoard', this.boardId);
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
