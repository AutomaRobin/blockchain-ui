<template>
    <div>
      <div class="row mb-3">
        <div class="col">
          <h1>Manage your Blockchain</h1>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link" @click="setComponent('appWallet')" :class="{active: activeComponent === 'appWallet'}">Wallet &amp; Node</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="setComponent('appNetwork')" :class="{active: activeComponent === 'appNetwork'}">Network</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="setComponent('appChat')" :class="{active: activeComponent === 'appChat'}">Chat</a>
            </li>
          </ul>
        </div>
        <div class="col">
          <p class="float-right" >Your node: {{ yourNode }}</p>
          </div>
        </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      yourNode: '',
      confirmed: false
    }
  },
  computed: {
    ...mapGetters([
      'activeComponent'
    ])
  },
  methods: {
    setComponent (value) {
      this.$store.state.componentActive = value
    }
  }
}
</script>

<style scoped>
  a {
    cursor: pointer;
  }
</style>
