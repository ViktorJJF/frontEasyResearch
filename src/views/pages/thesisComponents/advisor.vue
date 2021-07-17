<template>
  <research-chapter-card>
    <v-layout slot="body" justify-center align-center>
      <button-with-edit @storeData="updateAdvisor" :index="this.index"></button-with-edit>
    </v-layout>
  </research-chapter-card>
</template>

<script>
import { customCopyObject } from "../../../tools/customCopyObject";
export default {
  name: "advisor",
  props: ["index"],
  data() {
    return {};
  },
  methods: {
    updateAdvisor(completeObject) {
      console.log("se escribira: ", completeObject);
      let payload = {
        level1Index: this.index.level1Index,
        level2Index: this.index.level2Index,
        values: customCopyObject(completeObject.values)
      };
      this.$store.dispatch("research/updateResearchDynamically", payload);
      // this.updateCoverPage(completeObject.values[0].text);
    },
    updateCoverPage(advisor) {
      let payload = {
        type: "advisor",
        value: advisor
      };
      this.$store.dispatch("research/updateCoverPageDynamically", payload);
    }
  }
};
</script>

<style scoped>
</style>