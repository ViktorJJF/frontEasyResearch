<template>
  <v-container>
    <citations-component :citationsData="citations"></citations-component>
    <research-subtitle-modal :childNumber="hasLevel3" @onSubtitleAdded="addSubtitle"></research-subtitle-modal>
    <div v-if="hasLevel3>0">
      <research-element-card
        :title="level3.tag"
        v-for="level3 in completeObject.level3"
        :key="level3.id"
      >
        <exp-research-element slot="body" :type="level3.type" :data="level3.values"></exp-research-element>
        <v-container slot="help">Ayuda para el problema especifico</v-container>
      </research-element-card>
    </div>
  </v-container>
</template>

<script>
import { customCopyObject } from "../../../tools/customCopyObject";
export default {
  name: "theoricalBases",
  data() {
    return {
      completeObject: {},
      citations: []
    };
  },
  created() {
    this.getTheoricalBases();
  },
  methods: {
    getTheoricalBases() {
      let index = this.$store.getters["research/getResearchIndex"](
        "theoricalBases"
      );
      this.completeObject = this.$store.getters["research/getResearchData"](
        index
      );
      this.citations = this.completeObject.citations;
    },
    addSubtitle(newSubtitle) {
      console.log("se añadio un nuevo subtitulo: ", newSubtitle);
      this.completeObject.level3.push(newSubtitle);
      this.updateStore();
    },
    updateStore() {
      let indexes = this.$store.getters["research/getResearchIndex"](
        "theoricalBases"
      );
      let payload = {
        level1Index: indexes[0],
        level2Index: indexes[1],
        values: this.completeObject.level3
      };

      this.$store.dispatch("research/addLevel3Element", payload);
    }
  },
  computed: {
    hasLevel3() {
      return this.completeObject.level3.length;
    }
  }
};
</script>

<style scoped>
</style>