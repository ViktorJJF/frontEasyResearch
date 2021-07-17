<template>
  <v-container>
    <v-layout justify-center align-center>
      <button-with-edit @storeData="updateAuthor" :index="this.index"></button-with-edit>
    </v-layout>
  </v-container>
</template>

<script>
import { customCopyObject } from "../../../tools/customCopyObject";
export default {
  name: "author",
  props: ["index"],
  data() {
    return {};
  },
  methods: {
    updateAuthor(completeObject) {
      let payload = {
        level1Index: this.index.level1Index,
        level2Index: this.index.level2Index,
        values: customCopyObject(completeObject.values)
      };
      this.$store.dispatch("research/updateResearchDynamically", payload);
      this.updateCoverPage(completeObject.values[0].text);
    },
    updateCoverPage(author) {
      let payload = {
        type: "author",
        value: author
      };
      this.$store.dispatch("research/updateCoverPageDynamically", payload);
    }
  }
};
</script>

<style scoped>
</style>