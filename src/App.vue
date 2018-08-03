<template>
  <div class="container">
    <app-header></app-header>
    <hr>
    <app-messages></app-messages>
    <component :is="activeComponent"></component>
    <hr>
    <app-blockchain-loader></app-blockchain-loader>
  </div>
</template>

<script>
import Header from './components/Header'
import BlockchainLoader from './components/BlockchainLoader'
import Messages from './components/Messages'
import Wallet from './components/Wallet'
import Network from './components/Network'
import Chat from './components/Chat'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    appHeader: Header,
    appBlockchainLoader: BlockchainLoader,
    appMessages: Messages,
    appWallet: Wallet,
    appNetwork: Network,
    appChat: Chat
  },
  computed: {
    ...mapGetters([
      'activeComponent'
    ])
  }
}
</script>

<style>
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }

  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    margin: 6px;
    border: 6px solid #fa923f;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fa923f transparent transparent transparent;
  }

  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }

  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }

  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
