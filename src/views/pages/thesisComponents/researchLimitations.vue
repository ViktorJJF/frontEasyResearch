<template>
  <v-container>
    <div v-if="hasLevel3>0">
      <research-element-selector
        v-for="level3 in completeObject.level3"
        :key="level3.id"
        :type="level3.type"
        :data="level3"
      ></research-element-selector>
    </div>
    <research-element-card v-else :title="completeObject.tag">
      <exp-research-element slot="body" :type="completeObject.type" :data="completeObject.values"></exp-research-element>
      <v-container slot="help">esta ayudita te sera util para la justificacion</v-container>
    </research-element-card>
    <citations-component :citationsData="citations"></citations-component>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "researchLimitations",
  data() {
    return {
      completeObject: {},
      citations: []
    };
  },
  created() {
    this.getJustification();
  },
  methods: {
    getJustification() {
      let index = this.getResearchIndex("researchLimitations");
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

<style scoped>
</style>