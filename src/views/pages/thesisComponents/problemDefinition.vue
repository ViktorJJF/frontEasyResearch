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
    <!-- <citations-component v-if="citations.length>0" :citationsData="citations"></citations-component>
    <div class="headline">{{completeObject.level3[0].tag}}</div>
    <research-element
      :indexElement="[index.level1Index,index.level2Index,0]"
      :data="completeObject.level3[0].values"
      :completeObject="completeObject"
      :citationsData="citations"
      :add-button-text="'Añadir '+completeObject.level3[0].tag"
    ></research-element>
    <div class="headline">{{completeObject.level3[1].tag}}</div>
    <research-element
      v-for="(element,i) in completeObject.level3[1].level4"
      :key="element.id"
      :title="element.tag"
      :indexElement="[index.level1Index,index.level2Index,1,i]"
      :data="element.values"
      :completeObject="completeObject"
      :citationsData="citations"
      :add-button-text="'Añadir '+element.tag"
    ></research-element>-->
  </v-container>
</template>

<script>
import { customCopyObject } from "../../../tools/customCopyObject";
import { mapGetters } from "vuex";
export default {
  name: "problemDefinition",
  data() {
    return {
      completeObject: {},
      citations: []
    };
  },
  beforeMount() {
    this.getProblemDefinition();
  },
  methods: {
    getProblemDefinition() {
      let index = this.getResearchIndex("problemDefinition");
      this.completeObject = customCopyObject(
        this.$store.state.research.body.level1[index[0]].level2[index[1]]
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