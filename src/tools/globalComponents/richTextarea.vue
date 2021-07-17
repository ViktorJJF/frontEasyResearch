<template>
  <div id="textarea" contenteditable="true" @input="updateHTML"></div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {};
  },
  mounted: function() {
    this.$el.innerHTML = this.value;
  },
  methods: {
    updateHTML: function(e) {
      this.$emit("input", e.target.innerHTML);
    }
  }
};
</script>

<style lang="scss" scoped>
#textarea {
  display: inline-block;
  word-wrap: break-word;
  width: 100%;
  padding: 30px;
  background-color: #f3f3f3;
  border-radius: 3px;
  outline: 0;
}
</style>