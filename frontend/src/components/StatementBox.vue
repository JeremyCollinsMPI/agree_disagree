<template>
  <div class="statement-box">
    <p class="statement-text">{{ node.text }}</p>
    <div class="actions">
      <button class="thumbs-up" @click="vote('up')">👍 {{ upVotes }}</button>
      <button class="thumbs-down" @click="vote('down')">👎 {{ downVotes }}</button>
      <button class="expand-btn" @click="expand">Expand Supporting Arguments</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      upVotes: this.node.upVotes,
      downVotes: this.node.downVotes,
    };
  },
  methods: {
    vote(type) {
      if (type === 'up') {
        this.upVotes++;
      } else if (type === 'down') {
        this.downVotes++;
      }
    },
    expand() {
      this.$emit('expand', this.node.id);
    },
  },
};
</script>

<style scoped>
.statement-box {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

.statement-text {
  font-size: 18px;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions button {
  background: #007bff;
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.actions button:hover {
  background: #0056b3;
}
</style>
