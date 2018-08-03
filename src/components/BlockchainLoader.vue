<template>
  <div>
    <div class="row">
      <div class="col">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" :class="{active: view === 'chain'}" href="#" @click="view = 'chain'">Blockchain</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{active: view === 'tx'}" href="#" @click="view = 'tx'">Open Transactions</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="row my-3">
      <div class="col">
        <button class="btn btn-primary" @click="onLoadData">{{ view === 'chain' ? 'Load Blockchain' : 'Load Transactions' }}</button>
        <button v-if="view === 'chain' && walletVar" class="btn btn-success" @click="onMine">Mine Coins</button>
        <button class="btn btn-warning" @click="onResolve">Resolve Conflicts</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div v-if="dataLoading" class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div v-if="!dataLoading" class="accordion">
          <div class="card" v-for="(data, index) in loadedData" :key="index">
            <div v-if="view === 'chain'" class="card-header">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button" @click="showElement === index ? showElement = null : showElement = index">
                  Block #{{ data.index }}
                </button>
              </h5>
            </div>
            <div v-if="view === 'chain'" class="collapse" :class="{show: showElement === index}">
              <div class="card-body">
                <p>Previous Hash: {{ data.previous_hash }}</p>
                <div class="list-group">
                  <div v-for="tx in minedTransactions" v-if="tx.block == data.index" :key="tx" class="list-group-item flex-column align-items-start">
                    <div>Sender: {{ tx.sender }}</div>
                    <br>
                    <div>Recipient: {{ tx.recipient }}</div>
                    <br>
                    <div>Amount: {{ tx.amount }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="view === 'tx'" class="card-header">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button" @click="showElement === index ? showElement = null : showElement = index">
                  Transaction #{{ index }}
                </button>
              </h5>
            </div>
            <div v-if="view === 'tx'" class="collapse" :class="{show: showElement === index}">
              <div class="card-body">
                <div class="list-group">
                  <div class="list-group-item flex-column align-items-start">
                    <div>Sender: {{ data.sender }}</div>
                    <div>Recipient: {{ data.recipient }}</div>
                    <div>Amount: {{ data.amount }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
/* eslint-disable handle-callback-err */
import axios from 'axios'
export default {
  data () {
    return {
      dataLoading: false,
      txLoading: false,
      view: 'chain',
      showElement: null,
      blockchain: [],
      openTransactions: [],
      minedTransactions: []
    }
  },
  computed: {
    ...mapGetters([
      'walletVar'
    ]),
    loadedData: function () {
      if (this.view === 'chain') {
        return this.blockchain
      } else {
        return this.openTransactions
      }
    }
  },
  methods: {
    onMine: function () {
      let vm = this
      axios.post('/mine')
        .then(function (response) {
          vm.$store.state.error = null
          vm.$store.state.success = response.data.message
          console.log(response.data)
          vm.$store.state.funds = response.data.funds
        })
        .catch(function (error) {
          vm.$store.state.success = null
          vm.$store.state.error = error.response.data.message
        })
    },
    onResolve: function () {
      let vm = this
      axios.post('/resolve-conflicts')
        .then(function (response) {
          vm.$store.state.error = null
          vm.$store.state.success = response.data.message
        })
        .catch(function (error) {
          vm.$store.state.success = null
          vm.$store.state.error = error.response.data.message
        })
    },
    onLoadData: function () {
      if (this.view === 'chain') {
        // Load blockchain data
        let vm = this
        this.dataLoading = true
        axios.get('/chain')
          .then(function (response) {
            vm.blockchain = response.data.chain
            vm.minedTransactions = response.data.mined_transactions
            console.log(vm.blockchain)
            console.log(vm.minedTransactions)
            vm.dataLoading = false
          })
          .catch(function (error) {
            vm.dataLoading = false
            vm.$store.state.error = 'Something went wrong.'
          })
      } else {
        // Load transaction data
        let vm = this
        axios.get('/transactions')
          .then(function (response) {
            vm.openTransactions = response.data
            vm.dataLoading = false
          })
          .catch(function (error) {
            vm.dataLoading = false
            vm.$store.state.error = 'Something went wrong.'
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
