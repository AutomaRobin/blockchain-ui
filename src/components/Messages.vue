<template>
<div>
  <div v-if="errorMessage" class="alert alert-danger" role="alert">
    {{ errorMessage }}
    <button   @click="setErrorToFalse" type="button" class="close float-right" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <pre v-if="successMessage" class="alert alert-success" role="alert" style="white-space: pre-line; word-wrap: break-word; font-family: inherit">
      {{ successMessage }}
    <button @click="setSuccesToFalse" type="button" class="close float-right" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </pre>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'successMessage',
      'errorMessage'
    ])
  },
  methods: {
    setSuccesToFalse () {
      this.$store.state.success = false
    },
    setErrorToFalse () {
      this.$store.state.error = false
    }
  }
}
</script>

<style scoped>

</style>
