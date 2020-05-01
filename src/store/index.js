import Vue from 'vue'
import Vuex from 'vuex'

// 导入公共模块数据
import state from './common/state'
import getters from './common/getters'
import mutations from './common/mutations'
import actions from './common/actions'

// 导入其他模块数据
import carts from './modules/carts'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,

  modules: {
    carts,
    users
  }
})
