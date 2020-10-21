import * as types from '../types.js'
import { resOk } from '@/settings'
import { libraryList } from '@/api/psychological'

const state = {
    artTitle: []
}

const mutations = {
    [types.SET_ARTTITLE]: (state, param) => {
        state.artTitle = param
    }
}

const actions = {
    setArtTitle({ commit }) {
        return new Promise(function(resolve, rej) {
            libraryList().then((res) => {
                let data = res.data;
                if (res.code == resOk) {

                    commit(types.SET_ARTTITLE, data)
                    resolve(data)
                }
            }).catch((e)=>{rej(e)})
        })
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
