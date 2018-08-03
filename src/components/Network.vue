<template>
    <div>
      <div class="row">
        <div class="col">
          <form @submit.prevent="onAddNode">
            <div class="form-group">
              <label for="node-url">Node URL</label>
              <input v-model="newNodeUrl" type="text" class="form-control" id="node-url" placeholder="localhost:5001">
            </div>
            <button :disabled="newNodeUrl.trim() === ''" type="submit" class="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
      <hr>
      <div class="row my-3">
        <div class="col">
          <button class="btn btn-primary" @click="onLoadNodes">Load Peer Nodes</button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ul class="list-group">
            <button v-for="node in nodes" :key="node" style="cursor: pointer;" class="list-group-item list-group-item-action" @click="onRemoveNode(node)">
              <span v-if="node === yourNode" class="badge badge-info">Your node </span> {{ node }} (click to delete)
            </button>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      nodes: [],
      yourNode: '',
      newNodeUrl: ''
    }
  },
  methods: {
    onAddNode: function () {
      // Add node as peer node to local node server
      let vm = this
      axios.post('/node', { node: this.newNodeUrl })
        .then(function (response) {
          vm.success = response.data.message
          vm.error = null
          for (let i = 0; i < response.data.all_nodes.length; i++) {
            if (vm.nodes.includes(response.data.all_nodes[i].id)) {
              continue
            } else {
              vm.nodes.push(response.data.all_nodes[i].id)
            }
          }
        })
        .catch(function (error) {
          vm.success = null
          vm.error = error.response.data.message
        })
    },
    onLoadNodes: function () {
      // Load all peer nodes of the local node server
      let vm = this
      axios.get('/nodes')
        .then(function (response) {
          vm.success = 'Fetched nodes successfully.'
          vm.error = null
          for (let i = 0; i < response.data.all_nodes.length; i++) {
            if (vm.nodes.includes(response.data.all_nodes[i].id)) {
              continue
            } else {
              vm.nodes.push(response.data.all_nodes[i].id)
            }
          }
        })
        .catch(function (error) {
          vm.success = null
          vm.error = error.response.data.message
        })
    },
    onRemoveNode: function (nodeUrl) {
      // Remove node as a peer node
      let vm = this
      axios.delete('/node/' + nodeUrl)
        .then(function (response) {
          vm.success = response.data.message
          vm.error = null
          let index = vm.nodes.indexOf(nodeUrl)
          if (index > -1) {
            vm.nodes.splice(index, 1)
          }
        })
        .catch(function (error) {
          vm.success = null
          vm.error = error.response.data.message
        })
    }
  },
  created () {
    this.$store.state.success = null
    this.$store.state.error = null
  }
}
</script>

<style scoped>

</style>
