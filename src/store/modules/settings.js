/* eslint-disable space-before-function-paren */
import Config from '@/config'
import variables from '@/styles/element-variables.scss'

const settings = {
  state: {
    showRightPanel: false,
    tagsView: Config.tagsView,
    fixedHeader: Config.fixedHeader,
    sidebarLogo: Config.sidebarLogo,
    theme: variables.theme,
    settingBtn: Config.settingBtn,
    uniqueOpened: Config.uniqueOpened,
    webName: undefined
  },
  mutations: {
    CHANGE_SETTING: (state, {
      key,
      value
    }) => {
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    },
    WEB_NAME: (state, data) => {
      state.webName = data
    }
  },
  actions: {
    changeSetting({
      commit
    }, data) {
      commit('CHANGE_SETTING', data)
    },
    setWebName({
      commit
    }, data) {
      commit('WEB_NAME', data)
    }
  }
}
export default settings
