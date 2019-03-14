import * as types from './mutation-types'

const mutations = {
    [types.TEST](state, val) {
        state.flag = val;
    }
}
export default mutations