<template>
  <research-chapter-card>
    <v-layout slot="body" justify-center align-center>
      <button-with-edit @storeData="updatePlaceOfResearch" :index="this.index"></button-with-edit>
    </v-layout>
  </research-chapter-card>
</template>

<script>
import { customCopyObject } from "../../../tools/customCopyObject";
export default {
  name: "placeOfResearch",
  props: ["index"],
  methods: {
    updatePlaceOfResearch(completeObject) {
      let payload = {
        level1Index: this.index.level1Index,
        level2Index: this.index.level2Index,
        values: customCopyObject(completeObject.values)
      };
      this.$store.dispatch("research/updateResearchDynamically", payload);
    }
  }
};
</script>

<style scoped>
</style>