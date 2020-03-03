<template>
    <div class="btn-countainer">
        <van-button v-for="btn in btngroup" :key="btn.id"  hairline type="default" size="small" :disabled="btn.id==activeid" @click="bindBtnClick(btn.id)">{{btn.title}}</van-button>
    </div>
</template>

<script>
import {Button} from 'vant'
export default {
    name:'btnGroup',
    component:{
        [Button.name]:Button,
    },
    props:{
        btngroup:{
            type:Array,
            required:true
        },
        activeid:{
            type:String,
            default:''
        }
    },
    methods: {
        bindBtnClick(id){
            this.emit('btnGroupClick',id);
        }
    },
}
</script>

<style scoped>

</style>