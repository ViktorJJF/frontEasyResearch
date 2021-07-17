<template>
  <div v-if="hasLevel3 > 0">
    <research-element-selector
      v-for="level4 in completeObject.level4"
      :key="level4.id"
      :type="level4.type"
      :data="level4"
    ></research-element-selector>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'problemFormulation',
  data() {
    return {
      completeObject: {},
      citations: [],
    };
  },
  beforeMount() {
    this.getProblemDefinition();
  },
  methods: {
    getProblemDefinition() {
      let index = this.getResearchIndex('problemFormulation');
      this.completeObject = this.$store.getters['research/getResearchData'](
        index,
      );
      this.citations = this.completeObject.citations;
    },
  },
  computed: {
    hasLevel3() {
      return this.completeObject.level4.length;
    },
    ...mapGetters('research', ['getResearchIndex']),
  },
};
</script>

<style lang="scss" scoped>
</style>
