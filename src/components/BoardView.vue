<template>
<div class="container" v-if="board && board._id == boardId">
    <div v-if="!isModifying">
        <div class="post-heading">
            <div class="row">
                <div class="col-md-7 col-sm-12">
                    <h2> {{ board.board_title }} </h2>
                </div>
                <div class="col-md-2 col-sm-6">
                    <p> <span class="badge badge-primary">By</span>
                        <router-link :to="'/profile/' + board.user.user_id">{{ board.user.user_name }}</router-link>
                    </p>
                </div>
                <div class="col-md-3 col-sm-6">
                    <p> <span class="badge badge-primary">At</span> <a href="#stay_here" data-toggle="tooltip" title="" data-original-title="">{{ board.updated_at }}</a> </p>
                </div>
            </div>
        </div>

        <div class="post-content">
            {{ board.board_content }}
        </div>

        <div v-if="getUserId == board.user._id" class="post-buttons">
            <div class="row">
                <div class="col-sm-2">
                    <button class="btn btn-warning btn-block" role="button" @click="modifyBoard">글 수정</button>
                </div>
                <div class="col-sm-8"></div>
                <div class="col-sm-2">
                    <button class="btn btn-danger btn-block" data-toggle="modal" data-target="#confirmModal">글 삭제</button>
                </div>
            </div>
        </div>
    </div>

    <BoardForm v-else v-bind:currentBoardId="boardId" v-bind:initialBoardTitle="board.board_title"
        v-bind:initialBoardCategory="board.board_category.toString()" v-bind:initialBoardContent="board.board_content" 
        v-on:finished="finishModifyBoard" />
    <ConfirmModal modalHead="삭제 확인" modalBody="정말 게시글을 삭제합니까?" v-on:confirm="deleteBoard()" />
</div>
</template>

<script>
import ConfirmModal from './common/ConfirmModal.vue';
import BoardForm from './BoardForm.vue';
import BoardService from '../service/board';

export default {
    name: 'BoardView',
    props: ['boardId'],
    data() {
        return {
            isModifying: false
        };
    },
    mounted() {
        this.$store.dispatch('fetchBoard', this.boardId);
    },
    methods: {
        modifyBoard() {
            this.isModifying = true;
        },
        finishModifyBoard() {
            this.isModifying = false;
            this.$store.dispatch('fetchBoard', this.boardId);
        },
        deleteBoard() {
            BoardService.deleteBoard(this.boardId)
                .then(() => {
                    this.$notify({
                        title: '게시글 삭제 성공!',
                        text: '게시글이 성공적으로 삭제 되었습니다!',
                        type: 'success'
                    });
                    this.$router.push('/board/');
                });
        }
    },
    computed: {
        getUserId() {
            return this.$store.getters.getUserData.user__id;
        },
        board() {
            return this.$store.getters.getBoard;
        }
    },
    components: {
        ConfirmModal,
        BoardForm
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
    padding: 40px 0;
}

.post-buttons {
    padding-top: 20px;
}
</style>
