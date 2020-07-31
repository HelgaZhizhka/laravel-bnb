require('./bootstrap')

import Vue from 'vue'
import VueRouter from "vue-router"
import router from "./router"
import moment from 'moment'

import Index from "./Index.vue"
import StarRating from './shared/components/StarRating'

Vue.use(VueRouter)
Vue.filter('fromNow', value => moment(value).fromNow())
Vue.component("star-rating", StarRating)

const app = new Vue({
    el: '#app',
    router,
    components: {
        Index
    }
});
