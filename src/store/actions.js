import * as types from './mutation-types'

export const changeFlag = ({ commit }, val) => {
    commit(types.TEST, val);
}