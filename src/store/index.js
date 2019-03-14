import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import test from './modules/test'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        test
    },
    // strict: debug,
    plugins: debug ? [createLogger()] : []
})