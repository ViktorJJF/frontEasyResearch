<template>
  <v-layout justify-center>
    <button-with-edit @storeData="updateTitleOfResearch" :data="this.completeObject"></button-with-edit>
  </v-layout>
</template>

<script>
import { customCopyObject } from "../../../tools/customCopyObject";
import { mapGetters } from "vuex";
export default {
  name: "titleOfResearch",
  data() {
    return {
      completeObject: null
    };
  },
  beforeMount() {
    console.log("se empezara a buscar tl titulo");
    this.initialData();
  },
  methods: {
    initialData() {
      this.completeObject = this.$store.getters["research/getDataFromBody"](
        "titleOfResearch"
      );
    },
    updateTitleOfResearch(completeObject) {
      let index = this.getResearchIndex("titleOfResearch");
      let payload = {
        level1Index: index[0],
        level2Index: index[1],
        values: customCopyObject(completeObject.values)
      };
      this.$store.dispatch("research/updateResearchDynamically", payload);
      this.updateCoverPage(completeObject.values[0].text);
      this.updateConfigTitle(completeObject.values[0].text);
    },
    updateCoverPage(title) {
      let payload = {
        type: "titleOfResearch",
        value: title
      };
      this.$store.dispatch("research/updateCoverPageDynamically", payload);
    },
    updateConfigTitle(title) {
      let payload = {
        title: {
          problem: "",
          place: "",
          year: "",
          fullTitle: title
        }
      };
      this.$store.dispatch("research/updateTitle", payload);
    }
  },
  computed: {
    ...mapGetters("research", ["getResearchIndex"])
  }
};
</script>

<style scoped>
</style>