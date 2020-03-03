<template>
    <van-tabbar v-model="activeVal">
        <van-tabbar-item v-for="tabitem in tabbar" :key="tabitem.name" 
        replace
        :icon="tabitem.icon"
        :to="tabitem.name"
        >{{tabitem.text}}</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import {Tabbar,TabbarItem} from 'vant'
export default {
    name:'webTabbar',
    components:{
        [Tabbar.name]:Tabbar,
        [TabbarItem.name]:TabbarItem
    },
    props:{
        tabbar:{
            type:Array,
            required:true
        },
        active:{
            type:Number,
            required:true
        }
    },
    data(){
        return {
            activeVal:0
        }
    },
    created(){
        this.$emit('get-active');
        this.activeVal=this.active;
    },
}
</script>

<style scoped>

</style>