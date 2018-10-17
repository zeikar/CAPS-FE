<template>
<div class="register container">    
    <div class="row">
        <div class="col-md-4 register-main">
            <h3 class="text-center"> CAPS 회원가입 </h3>
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
                <button type="submit" :disabled="isProcessing" class="btn btn-primary btn-block">
                    <span v-if="isProcessing">회원 가입 중...</span>
                    <span v-else>회원 가입</span>
                </button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            user_id: '',
            user_password: '',

            // 진행 중
            isProcessing: false
        };
    },
    methods: {
        onSubmit() {
            this.isProcessing = true;

            this.$store.dispatch('register', {
                    user_id: this.user_id,
                    user_password: this.user_password
                })
                .then(() => {
                    // 로그인 성공
                    if (this.$store.getters.isLogined) {
                        this.$notify({
                            title: '회원 가입 성공!',
                            text: '로그인 해 주세요',
                            type: 'success'
                        });
                        this.$router.push('/login');
                    }
                    // 로그인 실패
                    else {
                        this.$notify({
                            title: '회원 가입 실패!',
                            text: '회원 가입에 실패하였습니다. 입력한 정보를 다시 확인해 주세요.',
                            type: 'error'
                        });
                        this.isProcessing = false;
                    }
                })
                .catch(error => console.log(error));
        }
    }
};
</script>

<style>
.register-main {
    margin: auto
}
</style>
