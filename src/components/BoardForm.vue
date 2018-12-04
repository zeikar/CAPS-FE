<template>
<div class="login container">
    <h3 class="text-center"> 
        <span v-if="isModifyMode()">글 수정</span>
        <span v-else>글 작성</span>
    </h3>
    <hr />
    <form v-on:submit.prevent="onSubmit">
        <InputForm v-bind:initialData="board_title" v-on:input="onBoardTitleChange" name="제목" />
        <SelectionForm v-bind:initialData="board_category" v-bind:selectList="getCategoryOptions" v-on:input="onBoardCategoryChange" name="카테고리" />

        <div class="form-group">
            <label for="board_content">내용</label>
            <textarea class="form-control" id="board_content"  v-model="board_content" rows="3"></textarea>
        </div>
        <button type="submit" :disabled="isProcessing" class="btn btn-primary btn-block">
            <span v-if="isProcessing && isModifyMode()">수정 중...</span>
            <span v-else-if="isProcessing">작성 중...</span>
            <span v-else-if="isModifyMode()">수정</span>
            <span v-else>작성</span>
        </button>
    </form>
</div>
</template>

<script>
import InputForm from './form/InputForm.vue';
import SelectionForm from './form/SelectionForm.vue';
import BoardService from '../service/board';

export default {
    name: 'BoardForm',
    mounted() {
        this.$store.dispatch('fetchBoardCategories');
    },
    data() {
        return {
            board_title: this.initialBoardTitle==undefined?'':this.initialBoardTitle,
            board_category: this.initialBoardCategory==undefined?'':this.initialBoardCategory,
            board_content: this.initialBoardContent==undefined?'':this.initialBoardContent,

            isBoardTitleValid: this.initialBoardTitle!=undefined,
            isBoardCategoryValid: this.initialBoardCategory!=undefined,
            // 진행 중
            isProcessing: false
        };
    },
    props: {
        currentBoardId: String,
        initialBoardTitle: String,
        initialBoardCategory: String,
        initialBoardContent: String
    },
    computed: {
        getCategoryOptions() {
            let boardCategories = this.$store.getters.getBoardCategories;
            let ret = [];
            for (let index = 0; index < boardCategories.length; index++) {
                ret.push({
                    value: boardCategories[index]._id.toString(),
                    text: boardCategories[index].category_name
                });
            }
            return ret;
        }
    },
    methods: {
        // 수정 모드인가
        isModifyMode() {
            return this.currentBoardId != undefined;
        },
        onBoardTitleChange(value, valid) {
            this.board_title = value;
            this.isBoardTitleValid = valid;
        },
        onBoardCategoryChange(value, valid) {
            this.board_category = value;
            this.isBoardCategoryValid = valid;
        },
        onSubmit() {
            // 전체 확인
            if (!(this.isBoardTitleValid && this.isBoardCategoryValid)) {
                this.$notify({
                    title: '올바르지 않은 입력이 있습니다.',
                    text: '다시 확인 후 입력해주세요.',
                    type: 'warn'
                });
                return;
            }

            this.isProcessing = true;

            // 수정 혹은 새로 작성
            if (this.isModifyMode()) {
                BoardService.modifyBoard(this.currentBoardId, {
                        board_title: this.board_title,
                        board_category: this.board_category,
                        board_content: this.board_content
                    })
                    .then(() => {
                        // 성공
                        this.$notify({
                            title: '게시글 수정 성공!',
                            text: '게시글이 성공적으로 수정 되었습니다!',
                            type: 'success'
                        });
                        this.$emit('finished');
                    })
                    .catch(error => {
                        console.log(error);
                        this.$notify({
                            title: '게시글 수정 실패!',
                            text: '게시글 수정에 실패하였습니다. 입력한 정보를 다시 확인해 주세요.',
                            type: 'error'
                        });
                        this.isProcessing = false;
                    });
            } else {
                BoardService.writeBoard({
                        board_title: this.board_title,
                        board_category: this.board_category,
                        board_content: this.board_content
                    })
                    .then((responseData) => {
                        // 성공
                        this.$notify({
                            title: '게시글 작성 성공!',
                            text: '게시글이 성공적으로 작성 되었습니다!',
                            type: 'success'
                        });
                        this.$router.push('/board/view/' + responseData.createdBoard._id);
                    })
                    .catch(error => {
                        console.log(error);
                        this.$notify({
                            title: '게시글 작성 실패!',
                            text: '게시글 작성에 실패하였습니다. 입력한 정보를 다시 확인해 주세요.',
                            type: 'error'
                        });
                        this.isProcessing = false;
                    });
            }
        }
    },
    components: {
        InputForm,
        SelectionForm
    }
};
</script>

<style>
</style>
