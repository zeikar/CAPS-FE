<template>
<div class="home container">
    <h1> CAPS Homepage </h1>
    <InputForm v-bind:initialData="input" v-on:input="onChange" 
        name="아이디" />
</div>
</template>

<script>
import InputForm from './form/InputForm.vue';

export default {
    name: 'Test',
    data() {
        return {
            input: '',
            inputValid: false
        };
    },
    methods: {
        onChange(value, valid) {
            this.input = value;
            this.inputValid = valid;
        }
    },
    components: {
        InputForm
    }
};
</script>
