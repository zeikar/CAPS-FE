<template>
<div class="container">
    <div class="alert alert-warning alert-dismissible fade show">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
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
