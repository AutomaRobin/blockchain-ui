import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    wallet: null,
    success: null,
    error: null,
    funds: 0,
    componentActive: ''
  },
  getters: {
    successMessage: state => {
      return state.success
    },
    errorMessage: state => {
      return state.error
    },
    walletVar: state => {
      return state.wallet
    },
    getFunds: state => {
      return state.funds.toFixed(2)
    },
    activeComponent: state => {
      return state.componentActive
    }
  }
})
