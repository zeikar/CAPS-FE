<template>
<div class="form-group mb-3">
    <label for="id">{{ name }}</label>
    <input type="text"  v-on:input="inputData=$event.target.value"
        :class="isInit?'form-control':isValid?'is-valid':'is-invalid'" @keyup="onInput()"
        id="id" class="form-control" :placeholder="nameWithJosa + ' 입력하세요'" autocomplete="off"
        aria-describedby="helpBlock" />
    <div v-show="!isValid" id="helpBlock" class="invalid-feedback form-text text-danger">
        <ul>
            <li v-for="(message, index) in validCheckMessage" v-bind:key="index">
                {{ message }}
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import Josa from 'josa-js';

export default {
    data() {
        return {
            inputData: this.initialData,
            validCheckMessage: [],

            nameWithJosa: this.name + Josa.c(this.name, '을')
        };
    },
    props: {
        initialData: String,
        name: String
    },
    computed: {
        isValid() {
            return this.validCheckMessage.length == 0;
        },
        isInit() {
            return this.validCheckMessage.length == 0 && this.inputData.length == 0;
        }
    },
    methods: {
        onInput() {
            // valid check
            this.validCheck();
            // emit this data to parent
            this.$emit('input', this.inputData, this.isValid);
        },
        validCheck() {
            this.validCheckMessage = [];
            if (this.inputData.length == 0) {
                this.validCheckMessage.push(this.nameWithJosa + ' 입력하세요.');
                return;
            }

            // more stuff
        }
    }
};
</script>
