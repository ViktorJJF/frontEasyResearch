<template>
  <v-container>
    <research-element-card :title="completeObject.tag">
      <exp-research-element slot="body" :type="completeObject.type" :data="completeObject.values"></exp-research-element>
      <v-container slot="help">esta ayudita te sera util para la justificacion</v-container>
    </research-element-card>
    <citations-component :citationsData="citations"></citations-component>
  </v-container>
</template>

<script>
import { customCopyObject } from "../../../tools/customCopyObject";
import { mapGetters } from "vuex";
export default {
  name: "antecedentsOfProblem",
  data() {
    return {
      completeObject: {},
      citations: []
    };
  },
  created() {
    this.getAntecedentOfProblem();
  },
  methods: {
    getAntecedentOfProblem() {
      let index = this.getResearchIndex("antecedentsOfProblem");
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