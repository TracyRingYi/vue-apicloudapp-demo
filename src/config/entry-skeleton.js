import Vue from 'vue'
import Skeleton from './skeleton/home'
export default new Vue({
    components:{
        Skeleton
    },
    template:`
        <div>
            <Skeleton id="skeletonHome" style="display:none"/>
        </div>
    `
})