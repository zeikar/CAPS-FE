<template>
<div class="login container">
    <h3 class="text-center"> 글 쓰기 </h3>
    <hr />
    <form v-on:submit.prevent="onSubmit">
        <InputForm v-bind:initialData="board_title" v-on:input="onBoardTitleChange" name="제목" />

        <div class="form-group mb-3">
            <label for="grade">카테고리</label>
            <select class="form-control" v-model="board_category"
                :class="board_category.length==0&&categoryValidCheckMessage.length==0?'form-control':isCategoryValid?'is-valid':'is-invalid'"  @change="categoryValidCheck()"
                aria-describedby="gradeHelpBlock" >
                <option disabled value="">카테고리를 선택하세요</option>
                <option v-for="option in getCategoryOptions()" v-bind:value="option.value" v-bind:key="option.value">
                    {{ option.text }}
                </option>
            </select>
            <div v-show="!isCategoryValid" id="gradeHelpBlock" class="invalid-feedback form-text text-danger">
                <ul>
                    <li v-for="(message, index) in categoryValidCheckMessage" v-bind:key="index">
                        {{ message }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="form-group">
            <label for="board_content">내용</label>
            <textarea class="form-control" id="board_content"  v-model="board_content" rows="3"></textarea>
        </div>
        <button type="submit" :disabled="isProcessing" class="btn btn-primary btn-block">
            <span v-if="isProcessing">작성 중...</span>
            <span v-else>작성</span>
        </button>
    </form>
</div>
</template>

<script>
import InputForm from './form/InputForm.vue';
import BoardService from '../service/board';

export default {
    name: 'BoardForm',
    data() {
        return {
            board_category: '',
            board_title: '',
            board_content: '',

            isBoardTitleValid: false,
            // 안내 메시지
            categoryValidCheckMessage: [],
            // 진행 중
            isProcessing: false
        };
    },
    computed: {
        isCategoryValid() {
            return this.categoryValidCheckMessage.length == 0;
        },
    },
    methods: {
        // 기수 선택용 옵션
        getCategoryOptions() {
            var options = [];

            // 카테고리 가져오기!!!!!!!!!!!! 필요
            options[0] = {
                text: '공지사항',
                value: 1
            };

            return options;
        },
        categoryValidCheck() {
            this.categoryValidCheckMessage = [];

            if (this.board_category === '') {
                this.categoryValidCheckMessage.push('카테고리를 선택하세요.');
            }
        },
        onBoardTitleChange(value, valid) {
            this.board_title = value;
            this.isBoardTitleValid = valid;
        },
        onSubmit() {
            // 전체 확인
            this.categoryValidCheck();

            if (!(this.isBoardTitleValid && this.isCategoryValid)) {
                this.$notify({
                    title: '올바르지 않은 입력이 있습니다.',
                    text: '다시 확인 후 입력해주세요.',
                    type: 'warn'
                });
                return;
            }

            this.isProcessing = true;

            BoardService.writeBoard({
                    board_category: this.board_category,
                    board_title: this.board_title,
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
                        text: '글 작성에 실패하였습니다. 입력한 정보를 다시 확인해 주세요.',
                        type: 'error'
                    });
                    this.isProcessing = false;
                });
        }
    },
    components: {
        InputForm
    }
};
</script>

<style>
</style>
