<template>
<div class="container">
    <div class="alert alert-warning">
        {{ msg }}
    </div>
</div>
</template>

<script>
export default {
    name: 'AlertMessage',
    props: {
        msg: String
    }
};
</script>
