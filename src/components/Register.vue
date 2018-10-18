<template>
<div class="register container">
    <div class="row">
        <div class="col-md-4 register-main">
            <h3 class="text-center"> CAPS 회원가입 </h3>
            <hr />
            <form v-on:submit.prevent="onSubmit">
                <div class="form-group mb-3">
                    <label for="id">아이디</label>
                    <input type="text" v-model="user_id" :class="isIdValid?'is-valid':'is-invalid'" @keyup="idValidCheck()"
                        id="id" class="form-control" placeholder="아이디를 입력하세요" autocomplete="off"
                        required autofocus aria-describedby="idHelpBlock" />
                    <div v-show="!isIdValid" id="idHelpBlock" class="invalid-feedback form-text text-danger">
                        <ul>
                            <li v-for="(message, index) in idValidCheckMessage" v-bind:key="index">
                                {{ message }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label for="password">비밀번호</label>
                    <input type="password" v-model="user_password" :class="isPasswordValid?'is-valid':'is-invalid'" @keyup="passwordValidCheck()"
                        id="password" class="form-control" placeholder="비밀번호를 입력하세요" autocomplete="off" 
                        required aria-describedby="passwordHelpBlock" />
                    <div v-show="!isPasswordValid" id="passwordHelpBlock" class="invalid-feedback form-text text-danger">
                        <ul>
                            <li v-for="(message, index) in passwordValidCheckMessage" v-bind:key="index">
                                {{ message }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label for="password-confirm">비밀번호 확인</label>
                    <input type="password" v-model="user_password_confirm"
                        id="password-confirm" class="form-control" placeholder="비밀번호를 한 번 더 입력하세요" autocomplete="off" required />
                    <div class="invalid-feedback">
                        invalid
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label for="name">이름</label>
                    <input type="text" v-on:input="user_name=$event.target.value"
                        id="name" class="form-control" placeholder="이름을 입력하세요" autocomplete="off" required />
                    <div class="invalid-feedback">
                        invalid
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label for="email">이메일</label>
                    <input type="email" v-model="user_email"
                        id="email" class="form-control" placeholder="이메일을 입력하세요" autocomplete="off" required />
                    <div class="invalid-feedback">
                        invalid
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label for="grade">기수</label>
                    <input type="number" v-model="user_grade" :class="{'is-invalid':user_grade <= 0 || user_grade >= maxGrade}"
                        id="grade" class="form-control" min="0" placeholder="기수를 입력하세요" autocomplete="off" required />
                    <div class="invalid-feedback">
                        invalid
                    </div>
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
import UserService from '../service/user';

export default {
    name: 'Register',
    data() {
        return {
            // 최대 기수 (신입생)
            maxGrade: new Date().getFullYear() - 1986,

            user_id: '',
            user_password: '',
            user_password_confirm: '',
            user_name: '',
            user_email: '',
            user_grade: '',

            // valid check
            idValidCheckMessage: [],
            passwordValidCheckMessage: [],

            // 진행 중
            isProcessing: false
        };
    },
    computed: {
        isIdValid() {
            return this.idValidCheckMessage.length == 0;
        },
        isPasswordValid() {
            return this.passwordValidCheckMessage.length == 0;
        }
    },
    methods: {
        idValidCheck() {
            this.idValidCheckMessage = [];
            if (this.user_id.length == 0) {
                this.idValidCheckMessage.push('아이디를 입력하세요.');
                return;
            }

            if (this.user_id.length < 4 || this.user_id.length > 20) {
                this.idValidCheckMessage.push('아이디는 4글자 이상, 20글자 이하여야 합니다.');
            }
            if (!this.user_id.match(/^[a-z0-9]+$/)) {
                this.idValidCheckMessage.push('아이디는 영문 소문자, 숫자로만 구성되어야 합니다.');
            }
            // 존재하는 아이디 체크
            UserService.checkUserId(this.user_id).then(data => {
                if (data.message == 'Found') {
                    this.idValidCheckMessage.push('이미 존재하는 아이디입니다.');
                }
            });
        },
        passwordValidCheck() {
            this.passwordValidCheckMessage = [];
            if (this.user_password.length == 0) {
                this.passwordValidCheckMessage.push('비밀번호를 입력하세요.');
                return;
            }

            if (this.user_password.length < 8 || this.user_password.length > 20) {
                this.passwordValidCheckMessage.push('비밀번호는 8글자 이상, 20글자 이하여야 합니다.');
            }
            if (!this.user_password.match(/^[a-zA-Z0-9]+$/)) {
                this.passwordValidCheckMessage.push('비밀번호는 영문 대소문자, 숫자로만 구성되어야 합니다.');
            }
        },
        onSubmit() {
            this.isProcessing = true;

            UserService.registerUser({
                    user_id: this.user_id,
                    user_password: this.user_password,
                    user_name: this.user_name,
                    user_email: this.user_email,
                    user_grade: this.user_grade
                })
                .then(() => {
                    // 회원 가입 성공
                    this.$notify({
                        title: '회원 가입 성공!',
                        text: '로그인 해 주세요',
                        type: 'success'
                    });
                    this.$router.push('/login');
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        title: '회원 가입 실패!',
                        text: '회원 가입에 실패하였습니다. 입력한 정보를 다시 확인해 주세요.',
                        type: 'error'
                    });
                    this.isProcessing = false;
                });
        }
    }
};
</script>

<style>
.register-main {
    margin: auto;
}
</style>
