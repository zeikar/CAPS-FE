<template>
<header class="navbar navbar-expand-md bg-light navbar-light">
    <div class="container">
        <router-link to="/" class="navbar-brand">CAPS</router-link>

        <!-- Toggler/collapsibe Button -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Links -->
        <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/board" class="nav-link">게시판</router-link>
                </li>
                <!-- Dropdown -->
                <li v-if="isLogined" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">안녕하세요 {{ getUserName }}님!</a>
                    <div class="dropdown-menu">
                        <router-link to="/notification" class="nav-link">알림</router-link>
                        <router-link to="/profile" class="nav-link">프로필</router-link>
                        <a href="#" class="nav-link" @click="onClickLogout">로그아웃</a>
                    </div>
                </li>
                <li v-else class="nav-item">
                    <router-link to="/login" class="nav-link">로그인</router-link>
                </li>
            </ul>
        </div>
    </div>
</header>
</template>

<script>
export default {
    name: 'Board',
    computed: {
        getUserName() {
            return this.$store.getters.getUserData.user_name;
        },
        isLogined() {
            return this.$store.getters.isLogined;
        }
    },
    methods: {
        onClickLogout() {
            // LOGOUT 변이 실행 후 리다이렉트 
            this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
        }
    }
};
</script>

<style>
header {
    margin-bottom: 30px;
}
</style>
