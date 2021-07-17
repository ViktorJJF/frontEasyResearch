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
  name: "antecedents",
  data() {
    return {
      completeObject: {},
      citations: []
    };
  },
  beforeMount() {
    this.getObjetives();
  },
  methods: {
    getObjetives() {
      let index = this.getResearchIndex("antecedents");
      this.completeObject = this.$store.getters["research/getResearchData"](
        index
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

<style lang="scss" scoped>
</style>