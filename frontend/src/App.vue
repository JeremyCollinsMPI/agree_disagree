<template>
  <div id="app" class="app-container">
    <h1>Agree or Disagree</h1>
    <div class="statement-container">
      <StatementBox
        v-for="node in nodes"
        :key="node.id"
        :node="node"
        @expand="fetchSupportingStatements"
      />
    </div>
  </div>
</template>

<script>
import StatementBox from './components/StatementBox.vue';

export default {
  components: {
    StatementBox,
  },
  data() {
    return {
      nodes: [
        {
          id: 1,
          text: "This is a short statement.",
          upVotes: 123,
          downVotes: 45,
          parentId: null,
        },
      ],
    };
  },
  methods: {
    async fetchSupportingStatements(nodeId) {
      console.log(`Fetching supporting statements for node ID: ${nodeId}`);
      // Mock data for now
      this.nodes.push({
        id: this.nodes.length + 1,
        text: `Supporting statement for node ${nodeId}`,
        upVotes: 10,
        downVotes: 2,
        parentId: nodeId,
      });
    },
  },
};
</script>

<style>
.app-container {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f4f4f4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 20px;
}

.statement-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}
</style>
