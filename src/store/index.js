import Vue from 'vue'
import Vuex from 'vuex'
import service from './modules/service'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        service,
    },
    strict: debug
})