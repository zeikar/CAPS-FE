<template>
<div class="login">    
    <div class="container">
        <div class="row">
            <div class="col-md-4 login-main">
                <AlertMessage v-show="loginMessage != ''" v-bind:msg="loginMessage" />
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">ID</span>
                    </div>
                    <input type="text" v-model="user_id"
                        class="form-control" id="id" placeholder="아이디를 입력하세요" autocomplete="off" required autofocus />
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">PW</span>
                    </div>
                    <input type="password" v-model="user_password"
                    class="form-control" id="password" placeholder="비밀번호를 입력하세요" autocomplete="off" required autofocus />
                </div>
                <div class="form-group form-check">
                    <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" /> Remember me
                    </label>
                </div>
                <button @click="onSubmit()" :disabled="isLoginProcessing" class="btn btn-primary btn-block">
                    <span v-if="isLoginProcessing">로그인 중...</span>
                    <span v-else>로그인</span>
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import AlertMessage from './common/AlertMessage.vue';

export default {
    name: 'Login',
    components: {
        AlertMessage
    },
    data() {
        return {
            user_id: '',
            user_password: '',

            // 로그인 진행 중
            isLoginProcessing: false,
            // 로그인 알림
            loginMessage: ''
        };
    },
    methods: {
        onSubmit() {
            this.isLoginProcessing = true;

            this.$store.dispatch('LOGIN', {
                    user_id: this.user_id,
                    user_password: this.user_password
                })
                .then(() => {
                    // 로그인 성공
                    if (this.$store.getters.isLogined) {
                        this.$router.push('/');
                    }
                    // 로그인 실패
                    else {
                        this.loginMessage = '로그인에 실패하였습니다. 아이디, 비밀번호를 다시 확인해 주세요.';
                        this.isLoginProcessing = false;
                    }
                })
                .catch(error => console.log(error));
        }
    }
};
</script>

<style>
.login-main {
    margin: auto
}
</style>
