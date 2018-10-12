<template>
<nav class="navbar navbar-expand-sm bg-light navbar-light">
    <div class="container">
        <router-link to="/" class="navbar-brand">CAPS</router-link>
        <!-- Links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link to="/board" class="nav-link">게시판</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/login" class="nav-link">로그인</router-link>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
export default {
    name: "Board"
}
</script>
