<template>
<div class="register container">
    <div class="row">
        <div class="col-md-4 register-main">
            <h3 class="text-center"> CAPS 회원가입 </h3>
            <hr />
            <form v-on:submit.prevent="onSubmit">
                <div class="form-group mb-3">
                    <label for="id">아이디</label>
                    <input type="text" v-model="user_id"
                        :class="isIdValid?'is-valid':'is-invalid'" @keyup="idValidCheck()"
                        id="id" class="form-control" placeholder="아이디를 입력하세요" autocomplete="off"
                        autofocus aria-describedby="idHelpBlock" />
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
                    <input type="password" v-model="user_password"
                        :class="isPasswordValid?'is-valid':'is-invalid'" @keyup="passwordValidCheck()"
                        id="password" class="form-control" placeholder="비밀번호를 입력하세요" autocomplete="off"
                        aria-describedby="passwordHelpBlock" />
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
                        :class="isPasswordConfirmValid?'is-valid':'is-invalid'" @keyup="passwordConfirmValidCheck()"
                        id="password-confirm" class="form-control" placeholder="비밀번호를 한 번 더 입력하세요" autocomplete="off"
                        aria-describedby="passwordConfirmHelpBlock" />
                    <div v-show="!isPasswordConfirmValid" id="passwordConfirmHelpBlock" class="invalid-feedback form-text text-danger">
                        <ul>
                            <li v-for="(message, index) in passwordConfirmValidCheckMessage" v-bind:key="index">
                                {{ message }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label for="name">이름</label>
                    <input type="text" v-on:input="user_name=$event.target.value"
                        :class="isNameValid?'is-valid':'is-invalid'" @keyup="nameValidCheck()"
                        id="name" class="form-control" placeholder="이름을 입력하세요" autocomplete="off"
                        aria-describedby="nameHelpBlock" />
                    <div v-show="!isNameValid" id="nameHelpBlock" class="invalid-feedback form-text text-danger">
                        <ul>
                            <li v-for="(message, index) in nameValidCheckMessage" v-bind:key="index">
                                {{ message }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label for="email">이메일</label>
                    <input type="email" v-model="user_email"
                        :class="isEmailValid?'is-valid':'is-invalid'" @keyup="emailValidCheck()"
                        id="email" class="form-control" placeholder="이메일을 입력하세요" autocomplete="off"
                        aria-describedby="emailHelpBlock" />
                    <div v-show="!isEmailValid" id="emailHelpBlock" class="invalid-feedback form-text text-danger">
                        <ul>
                            <li v-for="(message, index) in emailValidCheckMessage" v-bind:key="index">
                                {{ message }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label for="grade">기수</label>
                    <select class="form-control" v-model="user_grade"
                        :class="isGradeValid?'is-valid':'is-invalid'"  @change="gradeValidCheck()"
                        aria-describedby="gradeHelpBlock" >
                        <option disabled value="">기수를 선택하세요</option>
                        <option v-for="option in getGradeOptions()" v-bind:value="option.value" v-bind:key="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                    <div v-show="!isGradeValid" id="gradeHelpBlock" class="invalid-feedback form-text text-danger">
                        <ul>
                            <li v-for="(message, index) in gradeValidCheckMessage" v-bind:key="index">
                                {{ message }}
                            </li>
                        </ul>
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
            user_id: '',
            user_password: '',
            user_password_confirm: '',
            user_name: '',
            user_email: '',
            user_grade: '',

            // valid check
            idValidCheckMessage: [],
            passwordValidCheckMessage: [],
            passwordConfirmValidCheckMessage: [],
            nameValidCheckMessage: [],
            emailValidCheckMessage: [],
            gradeValidCheckMessage: [],

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
        },
        isPasswordConfirmValid() {
            return this.passwordConfirmValidCheckMessage.length == 0;
        },
        isNameValid() {
            return this.nameValidCheckMessage.length == 0;
        },
        isEmailValid() {
            return this.emailValidCheckMessage.length == 0;
        },
        isGradeValid() {
            return this.gradeValidCheckMessage.length == 0;
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
            UserService.checkUserId(this.user_id).then(res => {
                if (res.data.message == 'Found') {
                    this.idValidCheckMessage = [];
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
        passwordConfirmValidCheck() {
            this.passwordConfirmValidCheckMessage = [];
            if (this.user_password_confirm.length == 0) {
                this.passwordConfirmValidCheckMessage.push('비밀번호를 한 번 더 입력하세요.');
                return;
            }

            if (this.user_password != this.user_password_confirm) {
                this.passwordConfirmValidCheckMessage.push('비밀번호가 일치하지 않습니다.');
            }
        },
        nameValidCheck() {
            this.nameValidCheckMessage = [];
            if (this.user_name.length == 0) {
                this.nameValidCheckMessage.push('이름을 입력하세요.');
                return;
            }

            if (this.user_name.length < 2 || this.user_name.length > 5) {
                this.nameValidCheckMessage.push('이름은 2글자 이상, 5글자 이하여야 합니다.');
            }
            if (!this.user_name.match(/^[가-힣]+$/)) {
                this.nameValidCheckMessage.push('이름은 정상적인 한글 이름이어야 합니다.');
            }
        },
        emailValidCheck() {
            this.emailValidCheckMessage = [];
            if (this.user_email.length == 0) {
                this.emailValidCheckMessage.push('이메일을 입력하세요.');
                return;
            }

            if (this.user_email.length < 5 || this.user_email.length > 30) {
                this.emailValidCheckMessage.push('이메일은 5글자 이상, 30글자 이하여야 합니다.');
            }
            if (!this.user_email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                this.emailValidCheckMessage.push('정상적인 이메일 주소이어야 합니다.');
            }
        },
        gradeValidCheck() {
            this.gradeValidCheckMessage = [];

            if (this.user_grade === '') {
                this.gradeValidCheckMessage.push('기수를 선택하세요.');
                this.gradeValidCheckMessage.push('CAPS 회원이 아니시면 비회원을 선택하세요.');
                return;
            }
        },
        onSubmit() {
            // 전체 확인
            this.idValidCheck();
            this.passwordValidCheck();
            this.passwordConfirmValidCheck();
            this.nameValidCheck();
            this.emailValidCheck();
            this.gradeValidCheck();

            if (!(this.isIdValid && this.isPasswordValid && this.isPasswordConfirmValid &&
                    this.isNameValid && this.isEmailValid && this.isGradeValid)) {
                this.$notify({
                    title: '올바르지 않은 입력이 있습니다.',
                    text: '다시 확인 후 입력해주세요.',
                    type: 'warn'
                });
                return;
            }

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
                .catch(() => {
                    this.$notify({
                        title: '회원 가입 실패!',
                        text: '회원 가입에 실패하였습니다. 입력한 정보를 다시 확인해 주세요.',
                        type: 'error'
                    });
                    this.isProcessing = false;
                });
        },
        // 기수 선택용 옵션
        getGradeOptions() {
            var options = [];
            // 최대 기수 (신입생)
            const maxGrade = new Date().getFullYear() - 1986;

            for (var i = maxGrade; i >= 0; i--) {
                options.push({
                    text: i + '기',
                    value: i
                });
            }

            options[maxGrade].text = '비회원';
            options[0].text += ' (신입생)';

            return options;
        }
    }
};
</script>

<style>
.register-main {
    margin: auto;
}
</style>
