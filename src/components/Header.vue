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
                <a class="nav-link" href="#">Link 2</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link 3</a>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
export default {
    name: "Board",
    props: {}
}
</script>
