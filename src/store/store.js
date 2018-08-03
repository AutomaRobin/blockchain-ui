import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    nodeURL: '',
    nodeURLConfirmed: false,
    wallet: null,
    success: null,
    error: null,
    funds: 0
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
    }
  }
})
