<template>
<div class="board container table-responsive">
    <h3 class="text-center">
        <span>전체 게시판</span>
    </h3>
    <hr />
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
            <tr v-if="isFetching">
                <td colspan="5" class="text-center">데이터를 불러오는 중입니다.</td>
            </tr>
            <tr v-else-if="boards.length==0">
                <td colspan="5" class="text-center">해당하는 게시글이 없습니다.</td>
            </tr>
            <tr else v-for="(board, index) in boards" v-bind:key="board._id">
                <td>{{ boards.length - index }}</td>
                <td>
                    <a href="javascript:void(0)" @click="boardClick(board._id)">{{ board.board_title }}</a>
                </td>
                <td>
                    <a href="javascript:void(0)" @click="categoryChange(board.category._id)">{{ board.category.category_name }}</a>
                </td>
                <td>
                    <a href="javascript:void(0)" @click="profileClick(board.user.user_id)">{{ board.user.user_name }}</a>
                </td>
                <td>{{ board.updated_at }}</td>
            </tr>
        </tbody>
    </table>
    <div class="bottom-buttons">
        <router-link v-if="isLogined()" :to="'/board/write'" class="btn btn-outline-primary">글쓰기</router-link>
        <div class="input-group inline-input-group mb-3 float-right">
            <input type="search" class="form-control" placeholder="검색"
                @keyup.enter="fetchBoards()" v-model="searchQuery"/>
            <div class="input-group-append">
                <button class="btn btn-success" @click="fetchBoards()">검색</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Board',
    mounted() {
        this.fetchBoards();
    },
    data() {
        return {
            isFetching: true,
            searchQuery: '',
            categoryQuery: ''
        };
    },
    methods: {
        isLogined() {
            return this.$store.getters.isLogined;
        },
        categoryChange(categoryId) {
            this.categoryQuery = categoryId;
            this.fetchBoards();
        },
        fetchBoards() {
            this.isFetching = true;
            this.$store.dispatch('fetchBoards', {
                category: this.categoryQuery,
                search: this.searchQuery,
                page: this.$route.query.page
            }).then(() => {
                this.isFetching = false;
            });
        },
        boardClick(boardId) {
            let nextDestination = '/board/view/' + boardId;
            // 로그인 체크
            if (!this.isLogined()) {
                this.$notify({
                    title: '로그인 필요',
                    text: '게시글을 보시려면 로그인이 필요합니다. 로그인해 주세요.',
                    type: 'warn'
                });
                this.$store.dispatch('setNextDestination', nextDestination).then(() => this.$router.push('/login'));

                return;
            }
            this.$router.push(nextDestination);
        },
        profileClick(userId) {
            let nextDestination = '/profile/' + userId;
            // 로그인 체크
            if (!this.isLogined()) {
                this.$notify({
                    title: '로그인 필요',
                    text: '프로필을 보시려면 로그인이 필요합니다. 로그인해 주세요.',
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
.bottom-buttons {
    border-top: 1px solid #cccccc;
    padding-top: 20px;
}

.inline-input-group {
    width: auto;
}
</style>
