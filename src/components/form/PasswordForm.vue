<template>
<div>
    <div class="form-group mb-3">
        <label for="password">비밀번호</label>
        <input type="password" v-model="password" required
            :class="isPasswordInit?'form-control':isPasswordValid?'is-valid':'is-invalid'" @keyup="onPasswordInput()"
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
        <input type="password" v-model="passwordConfirm" required
            :class="isPasswordConfirmInit?'form-control':isPasswordConfirmValid?'is-valid':'is-invalid'" @keyup="onPasswordConfirmInput()"
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
</div>
</template>

<script>
export default {
    data() {
        return {
            password: '',
            passwordConfirm: '',
            
            passwordValidCheckMessage: [],
            passwordConfirmValidCheckMessage: [],
        };
    },
    computed: {
        isPasswordValid() {
            return this.passwordValidCheckMessage.length == 0;
        },
        isPasswordConfirmValid() {
            return this.passwordConfirmValidCheckMessage.length == 0;
        },
        isPasswordInit() {
            return this.passwordValidCheckMessage.length == 0 && this.password.length == 0;
        },
        isPasswordConfirmInit() {
            return this.passwordConfirmValidCheckMessage.length == 0 && this.passwordConfirm.length == 0;
        }
    },
    methods: {
        onPasswordInput() {
            this.passwordValidCheck();
            this.onPasswordConfirmInput();
            this.$emit('passwordInput', this.password, this.isPasswordValid);
        },
        onPasswordConfirmInput() {
            this.passwordConfirmValidCheck();
            this.$emit('passwordConfirmInput', this.password, this.isPasswordConfirmValid);
        },
        passwordValidCheck() {
            this.passwordValidCheckMessage = [];
            if (this.password.length == 0) {
                this.passwordValidCheckMessage.push('비밀번호를 입력하세요.');
                return;
            }

            if (this.password.length < 8 || this.password.length > 20) {
                this.passwordValidCheckMessage.push('비밀번호는 8글자 이상, 20글자 이하여야 합니다.');
            }
            if (!this.password.match(/^[a-zA-Z0-9]+$/)) {
                this.passwordValidCheckMessage.push('비밀번호는 영문 대소문자, 숫자로만 구성되어야 합니다.');
            }
        },
        passwordConfirmValidCheck() {
            this.passwordConfirmValidCheckMessage = [];
            if (this.passwordConfirm.length == 0) {
                this.passwordConfirmValidCheckMessage.push('비밀번호를 한 번 더 입력하세요.');
                return;
            }

            if (this.password != this.passwordConfirm) {
                this.passwordConfirmValidCheckMessage.push('비밀번호가 일치하지 않습니다.');
            }
        }
    }
};
</script>
