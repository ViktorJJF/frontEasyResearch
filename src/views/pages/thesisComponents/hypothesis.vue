<template>
  <div v-if="hasLevel3>0">
    <research-element-selector
      v-for="level3 in completeObject.level3"
      :key="level3.id"
      :type="level3.type"
      :data="level3"
    ></research-element-selector>
  </div>
</template>

<script>
import { customCopyObject } from "../../../tools/customCopyObject";
import { mapGetters } from "vuex";
export default {
  name: "hypothesis",
  data() {
    return {
      completeObject: {},
      citations: []
    };
  },
  beforeMount() {
    this.getHypothesis();
  },
  methods: {
    getHypothesis() {
      let index = this.getResearchIndex("hypothesis");
      this.completeObject = customCopyObject(
        this.$store.state.research.body.level1[index[0]].level2[index[1]]
      );
      this.citations = this.completeObject.citations;
    }
  },
  computed: {
    hasLevel3() {
      return this.completeObject.level3.length;
    },
    ...mapGetters("research", ["getResearchIndex"])
  }
};
</script>

<style scoped>
</style>