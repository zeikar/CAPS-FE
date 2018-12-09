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
                <td>{{ totalCount - (pageQuery - 1) * pageLimit - index }}</td>
                <td>
                    <a href="javascript:void(0)" @click="boardClick(board._id)">{{ board.board_title }}</a>
                </td>
                <td>
                    <a href="javascript:void(0)" @click="categoryClick(board.category._id)">{{ board.category.category_name }}</a>
                </td>
                <td>
                    <a href="javascript:void(0)" @click="profileClick(board.user.user_id)">{{ board.user.user_name }}</a>
                </td>
                <td>{{ board.updated_at }}</td>
            </tr>
        </tbody>
    </table>
    <div class="bottom-buttons d-flex justify-content-between align-items-baseline row">
        <div class="col-sm-3">
            <router-link v-if="isLogined()" :to="'/board/write'" class="btn btn-outline-primary">글쓰기</router-link>
        </div>
        <div class="col-sm-6">
            <ul class="pagination justify-content-center">
                <li v-for="page in totalPages" :key="page" :class="page==pageQuery?'active':''" class="page-item">
                    <a class="page-link" href="javascript:void(0);" @click="pageClick(page)">{{ page }}</a>
                </li>
            </ul>
        </div>
        <div class="col-sm-3 input-group inline-input-group mb-3 float-right">
            <input type="search" class="form-control" placeholder="검색"
                @keyup.enter="searchClick()" v-model="searchQuery"/>
            <div class="input-group-append">
                <button class="btn btn-success" @click="searchClick()">검색</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import BoardService from '../service/board';

export default {
    name: 'Board',
    mounted() {
        this.fetchBoards();
    },
    data() {
        return {
            boards: [],
            isFetching: true,
            searchQuery: '',
            categoryQuery: '',
            pageQuery: 1,

            totalPages: 0,
            totalCount: 0,
            pageLimit: 0
        };
    },
    methods: {
        isLogined() {
            return this.$store.getters.isLogined;
        },
        // 쿼리 생성
        generateQuery() {
            // 쿼리 생성
            this.$router.push({
                query: {
                    category: this.categoryQuery,
                    search: this.searchQuery,
                    page: this.pageQuery
                }
            });
        },
        categoryClick(categoryId) {            
            this.pageQuery = 1;
            this.categoryQuery = categoryId;
            this.generateQuery();
            this.fetchBoards();
        },
        searchClick() {
            this.pageQuery = 1;
            this.generateQuery();
            this.fetchBoards();
        },
        pageClick(pageNum) {
            if (pageNum != this.pageQuery) {
                this.pageQuery = pageNum;
                this.generateQuery();
                this.fetchBoards();
            }
        },
        fetchBoards() {
            this.isFetching = true;
            // 가져오기
            BoardService.getBoards({
                category: this.$route.query.category,
                search: this.$route.query.search,
                page: this.$route.query.page
            }).then((response) => {
                this.boards = response.data.result;
                this.totalPages = response.data.pages;
                this.totalCount = response.data.count;
                this.pageLimit = response.data.limit;
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
    watch: {
        '$route.query'() {
            this.fetchBoards();
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
