<template>
<div class="login container">
    <h3 class="text-center">프로필 수정</h3>
    <hr />
    <form v-on:submit.prevent="onSubmit">
        <PasswordForm v-on:passwordInput="onPasswordChange" v-on:passwordConfirmInput="onPasswordConfirmChange" />
        <InputForm v-bind:initialData="user_comment" v-on:input="onUserCommentChange" name="프로필 메시지" />

        <button type="submit" :disabled="isProcessing" class="btn btn-primary btn-block">
            <span v-if="isProcessing">수정 중...</span>
            <span v-else>수정</span>
        </button>
    </form>
</div>
</template>

<script>
import InputForm from './form/InputForm.vue';
import PasswordForm from './form/PasswordForm.vue';
import UserService from '../service/user';

export default {
    data() {
        return {
            user_password: '',
            user_comment: this.initialUserComment == undefined ? '' : this.initialUserComment,

            isPasswordValid: false,
            isPasswordConfirmValid: false,
            isUserCommentValid: false,
            // 진행 중
            isProcessing: false
        };
    },
    props: {
        initialUserComment: String
    },
    methods: {
        onPasswordChange(value, valid) {
            this.user_password = value;
            this.isPasswordValid = valid;
        },
        onPasswordConfirmChange(value, valid) {
            this.isPasswordConfirmValid = valid;
        },
        onUserCommentChange(value, valid) {
            this.user_comment = value;
            this.isUserCommentValid = valid;
        },
        onSubmit() {
            // 전체 확인
            if (!(this.isPasswordValid && this.isPasswordConfirmValid)) {
                this.$notify({
                    title: '올바르지 않은 입력이 있습니다.',
                    text: '다시 확인 후 입력해주세요.',
                    type: 'warn'
                });
                return;
            }

            this.isProcessing = true;

            UserService.editUserData({
                    user_password: this.user_password,
                    user_comment: this.user_comment
                })
                .then(() => {
                    // 성공
                    this.$notify({
                        title: '프로필 수정 성공!',
                        text: '프로필이 성공적으로 수정 되었습니다!',
                        type: 'success'
                    });
                    this.isProcessing = false;
                })
                .catch(() => {
                    this.$notify({
                        title: '프로필 수정 실패!',
                        text: '프로필 수정에 실패하였습니다. 입력한 정보를 다시 확인해 주세요.',
                        type: 'error'
                    });
                    this.isProcessing = false;
                });
        }
    },
    components: {
        InputForm,
        PasswordForm
    }
};
</script>

<style>

</style>
