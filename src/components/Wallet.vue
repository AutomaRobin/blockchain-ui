<template>
    <div>
      <div class="row">
        <div class="col">
          <div v-if="!walletLoading">
            <button class="btn btn-primary" @click="onCreateWallet">
              Create new Wallet
            </button>
            <button class="btn btn-primary" @click="inputPrivateKey = true">
              Load Wallet
            </button>
            <div v-if="inputPrivateKey" class="form-group">
              <br>
              <input type="text" class="form-control" v-model="privateKey"
                     placeholder="What is your private key?">
            </div>
            <button v-if="inputPrivateKey" class="btn btn-primary"
                    @click="onLoadWallet">Load wallet with private key</button>
            <button v-if="inputPrivateKey" class="btn btn-link btn-sm" @click="inputPrivateKey = false">Close</button>
          </div>
          <div v-if="walletLoading" class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="col text-right">
          <h2>Funds: {{ funds.toFixed(2) }}</h2>
        </div>
      </div>
      <hr>
      <div v-if="!walletVar" class="row">
        <div class="col">
          <div class="alert alert-warning">Create a Wallet to start sending coins or to mine coins!</div>
        </div>
      </div>
      <div v-if="walletVar" class="row">
        <div class="col">
          <form @submit.prevent="onSendTx">
            <div class="form-group">
              <label for="recipient">Recipient Key</label>
              <input v-model="outgoingTx.recipient" type="text" class="form-control" id="recipient" placeholder="Enter key">
            </div>
            <div class="form-group">
              <label for="amount">Amount of Coins</label>
              <input v-model.number="outgoingTx.amount" type="number" step="0.001" class="form-control" id="amount">
              <small class="form-text text-muted">Fractions are possible (e.g. 5.67)</small>
            </div>
            <div v-if="txLoading" class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <button :disabled="txLoading || outgoingTx.recipient.trim() === '' || outgoingTx.amount <= 0" type="submit" class="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      walletLoading: false,
      txLoading: false,
      inputPrivateKey: false,
      privateKey: '',
      createdWallet: false,
      funds: 0,
      outgoingTx: {
        recipient: '',
        amount: 0
      }
    }
  },
  methods: {
    onCreateWallet: function () {
      // Send Http request to create a new wallet (and return keys)
      let vm = this
      this.walletLoading = true
      axios.post('/wallet')
        .then(function (response) {
          vm.createdWallet = true
          vm.$store.state.error = null
          vm.$store.state.success = 'Created Wallet!\n\n' +
            'Public Key:\n' + response.data.public_key +
            '\n\nPrivate Key: \n' + response.data.private_key
          vm.$store.state.wallet = {
            public_key: response.data.public_key,
            private_key: response.data.private_key
          }
          vm.funds = response.data.funds
          vm.walletLoading = false
        })
        .catch(function (error) {
          vm.$store.state.success = null
          vm.$store.state.error = error.response.data.message
          vm.$store.state.wallet = null
          vm.walletLoading = false
        })
    },
    onLoadWallet: function () {
      // Send Http request to load an existing wallet (from a file on the server)
      let vm = this
      this.walletLoading = true
      axios.post('/loadwallet', {
        private_key: vm.privateKey
      })
        .then(function (response) {
          console.log(vm.privateKey)
          vm.$store.state.error = null
          vm.$store.state.success = 'Loaded Wallet!\n\n' +
            'Public Key:\n' + response.data.public_key +
            '\n\nPrivate Key:\n' + response.data.private_key
          vm.$store.state.wallet = {
            public_key: response.data.public_key,
            private_key: response.data.private_key
          }
          vm.funds = response.data.funds
          vm.walletLoading = false
        })
        .catch(function (error) {
          console.log(vm.privateKey)
          vm.$store.state.success = null
          vm.$store.state.error = error.response.data.message
          vm.$store.state.wallet = null
          vm.walletLoading = false
        })
    },
    onSendTx: function () {
      // Send Transaction to backend
      this.txLoading = true
      let vm = this
      axios.post('/transaction', {
        recipient: this.outgoingTx.recipient,
        amount: this.outgoingTx.amount
      })
        .then(function (response) {
          vm.$store.state.error = null
          vm.$store.state.success = response.data.message
          console.log(response.data)
          vm.funds = response.data.funds
          vm.txLoading = false
        })
        .catch(function (error) {
          vm.$store.state.success = null
          vm.$store.state.error = error.response.data.message
          vm.txLoading = false
        })
    }
  },
  computed: {
    ...mapGetters([
      'walletVar'
    ])
  }
}
</script>

<style scoped>

</style>
