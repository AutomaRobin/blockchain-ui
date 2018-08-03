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
              <a class="nav-link active" href="/">Wallet &amp; Node</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/network">Network</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/chat">Chat</a>
            </li>
          </ul>
        </div>
        <div class="col">
          <p class="float-right" v-if="confirmed">Your node: {{ yourNode }}</p>
          <div v-if="!confirmed">
            <b-input-group prepend="Your node ID">
              <b-form-input v-model="yourNode"></b-form-input>
              <b-input-group-append>
                <b-btn variant="info" @click="confirmNodeID">Submit</b-btn>
              </b-input-group-append>
            </b-input-group>
            <small>Specify this before making use of the blockchain</small>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      yourNode: '',
      confirmed: false
    }
  },
  methods: {
    confirmNodeID () {
      this.$store.state.nodeURL = 'http://' + this.yourNode
      this.$store.state.nodeURLConfirmed = true
      this.confirmed = true
    }
  },
  created () {
    if (this.$store.state.nodeURLConfirmed === true) {
      this.yourNode = this.$store.state.nodeURL
      this.confirmed = true
    }
  }
}
</script>

<style scoped>

</style>
