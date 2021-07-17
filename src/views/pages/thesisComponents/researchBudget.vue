<template>
  <v-container>
    <research-element
      :title="completeObject.tag"
      :indexElement="[index.level1Index,index.level2Index]"
      :data="completeObject.values"
      :completeObject="completeObject"
      :add-button-text="'Añadir '+completeObject.tag"
    ></research-element>
  </v-container>
</template>

<script>
import { customCopyObject } from "../../../tools/customCopyObject";
export default {
  name: "researchBudget",
  props: ["index"],
  data() {
    return {
      completeObject: {}
    };
  },
  created() {
    this.getHumanResources();
  },
  methods: {
    getHumanResources() {
      this.completeObject = customCopyObject(
        this.$store.state.research.body.level1[this.index.level1Index].level2[
          this.index.level2Index
        ]
      );
    }
  }
};
</script>

<style scoped>
</style>