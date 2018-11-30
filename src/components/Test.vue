<template>
<div class="home container">
    <h1> CAPS Homepage </h1>
    <SelectionForm v-bind:initialData="input" v-bind:selectList="options" v-on:input="onChange" 
        name="카테고리" />
</div>
</template>

<script>
import SelectionForm from './form/SelectionForm.vue';

export default {
    name: 'Test',
    data() {
        return {
            input: '',
            inputValid: false,
            options: [
              {
                text: '공지사항',
                value: 1
            }
            ]
        };
    },
    methods: {
        onChange(value, valid) {
            this.input = value;
            this.inputValid = valid;
        }
    },
    components: {
        SelectionForm
    }
};
</script>