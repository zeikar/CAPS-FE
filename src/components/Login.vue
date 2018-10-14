<template>
<div class="login container">
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">ID</span>
        </div>
        <input type="text" v-model="user_id"
            class="form-control" id="id" placeholder="아이디를 입력하세요" autocomplete="off" />
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">PW</span>
        </div>
        <input type="password" v-model="user_password"
            class="form-control" id="password" placeholder="비밀번호를 입력하세요" autocomplete="off" />
    </div>
    <div class="form-group form-check">
        <label class="form-check-label">
            <input class="form-check-input" type="checkbox" /> Remember me
        </label>
    </div>
    <button @click="onSubmit(user_id, user_password)" class="btn btn-primary btn-block">로그인</button>
</div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user_id: "",
      user_password: ""
    };
  },
  methods: {
    onSubmit(user_id, user_password) {
        console.log(user_id + ' ' + user_password);
        
      /*this.$store
        .dispatch("LOGIN", user_id, user_password)
        .then(() => this.redirect())
        .catch(({ message }) => (this.msg = message));*/
    }
  }
};
</script>
