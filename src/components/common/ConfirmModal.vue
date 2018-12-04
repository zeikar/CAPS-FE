<template>
<div class="modal fade" id="confirmModal">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">{{ modalHead }}</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
                {{ modalBody }}
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="onConfirmClick()">확인</button>                
                <button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
            </div>

        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        modalHead: String,
        modalBody: String
    },
    methods: {
        onConfirmClick() {
            // emit this data to parent
            this.$emit('confirm');
        }
    }
};
</script>

<style>

</style>
