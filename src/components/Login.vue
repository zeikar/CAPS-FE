<template>
<div class="login container">    
    <div class="row">
        <div class="col-md-4 login-main">
            <h3 class="text-center"> CAPS 로그인 </h3>
            <hr />
            <form v-on:submit.prevent="onSubmit">
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
                        class="form-control" id="password" placeholder="비밀번호를 입력하세요" autocomplete="off" required />
                </div>                
                <button type="submit" :disabled="isLoginProcessing" class="btn btn-primary btn-block">
                    <span v-if="isLoginProcessing">로그인 중...</span>
                    <span v-else>로그인</span>
                </button>
            </form>
            <hr />
            <p> 아직 회원이 아니시라면? <router-link to="/register" class="badge badge-info">회원 가입</router-link></p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            user_id: '',
            user_password: '',

            // 로그인 진행 중
            isLoginProcessing: false
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
                        this.$notify({
                            title: '로그인 성공!',
                            text: '환영합니다 ' + this.$store.getters.getUserData.user_name + '님!',
                            type: 'success'
                        });
                        this.$router.push(this.$store.getters.getNextDestination);
                    }
                    // 로그인 실패
                    else {
                        this.$notify({
                            title: '로그인 실패!',
                            text: '로그인에 실패하였습니다. 아이디, 비밀번호를 다시 확인해 주세요.',
                            type: 'warn'
                        });
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
