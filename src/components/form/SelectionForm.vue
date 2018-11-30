<template>
<div class="form-group mb-3">
    <label :for="name">{{ name }}</label>
    <select class="form-control" v-model="selectedData" required
        :class="selectedData.length==0&&validCheckMessage.length==0?'form-control':isValid?'is-valid':'is-invalid'"  @change="onInput()"
        :aria-describedby="name + 'HelpBlock'" >
        <option disabled value="">카테고리를 선택하세요</option>
        <option v-for="option in selectList" v-bind:value="option.value" v-bind:key="option.value">
            {{ option.text }}
        </option>
    </select>
    <div v-show="!isValid" :id="name + 'HelpBlock'" class="invalid-feedback form-text text-danger">
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
            selectedData: this.initialData,
            validCheckMessage: [],

            nameWithJosa: this.name + Josa.c(this.name, '을')
        };
    },
    props: {
        initialData: String,
        name: String,
        selectList: Array
    },
    computed: {
        isValid() {
            return this.validCheckMessage.length == 0;
        },
        isInit() {
            return this.validCheckMessage.length == 0 && this.selectedData.length == 0;
        }
    },
    methods: {
        onInput() {
            // valid check
            this.validCheck();
            // emit this data to parent
            this.$emit('input', this.selectedData, this.isValid);
        },
        validCheck() {
            this.validCheckMessage = [];
            if (this.selectedData.length == 0) {
                this.validCheckMessage.push(this.nameWithJosa + ' 선택하세요.');
                return;
            }

            // more stuff
        }
    }
};
</script>
