<template>
  <div>
    <research-card
      @onSave="saveIntoStoreAndDB"
      :title="'Capítulo '+romanNumber(level1Index)+'. '+capitalize(level1Title)"
    >
      <div slot="body">
        <!-- <v-list>
          <v-list-item
            :to="{name:'updateLevel2',params:{level2:title.type}}"
            @click
            v-for="(title,i) in level2Titles(level1Index)"
            :key="i"
          >
            <v-list-item-content>
              <p class="textDecoration">{{level1Index+1}}.{{i+1}}. {{ title.text }}</p>
              <v-divider inset></v-divider>
            </v-list-item-content>
          </v-list-item>
        </v-list>-->
        <v-expansion-panels v-if="level2Titles(level1Index).length>0" focusable>
          <v-expansion-panel v-for="(title,i) in level2Titles(level1Index)" :key="i">
            <v-expansion-panel-header class="title">
              <div>{{level1Index+1}}.{{i+1}}. {{ title.text }}</div>
              <template v-slot:actions>
                <v-icon color="primary">$vuetify.icons.expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="'blue darken-1'">
              <component
                :is="componentToShow(title.type)"
                :index="{level1Index:level1Index,level2Index:i}"
              ></component>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <research-element-selector v-else :type="$route.params.type"></research-element-selector>
      </div>
      <div slot="contentModal"></div>
    </research-card>
  </div>
</template>

<script>
import advisor from "./thesisComponents/advisor";
import antecedents from "./thesisComponents/antecedents";
import author from "./thesisComponents/author";
import dataAnalysis from "./thesisComponents/dataAnalysis";
import definitionOfTerms from "./thesisComponents/definitionOfTerms";
import formulationOfResearchProblem from "./thesisComponents/formulationOfResearchProblem";
import goodAndServices from "./thesisComponents/goodAndServices";
import humanResources from "./thesisComponents/humanResources";
import hypothesis from "./thesisComponents/hypothesis";
import instruments from "./thesisComponents/instruments";
import justification from "./thesisComponents/justification";
import levelOfResearch from "./thesisComponents/levelOfResearch";
import operationalizationOfVariables from "./thesisComponents/operationalizationOfVariables";
import placeOfResearch from "./thesisComponents/placeOfResearch";
import populationAndSample from "./thesisComponents/populationAndSample";
import problemDefinition from "./thesisComponents/problemDefinition";
import problemStatement from "./thesisComponents/problemStatement";
import researchArea from "./thesisComponents/researchArea";
import researchBudget from "./thesisComponents/researchBudget";
import researchLine from "./thesisComponents/researchLine";
import schedule from "./thesisComponents/schedule";
import theoricalBases from "./thesisComponents/theoricalBases";
import titleOfResearch from "./thesisComponents/titleOfResearch";
import typeOfResearch from "./thesisComponents/typeOfResearch";
import researchLimitations from "./thesisComponents/researchLimitations";
import objetives from "./thesisComponents/objetives";
import antecedentsOfProblem from "./thesisComponents/antecedentsOfProblem";
import goods from "./thesisComponents/goods";
import services from "./thesisComponents/services";
import fundingSources from "./thesisComponents/fundingSources";
import actionsToDo from "./thesisComponents/actionsToDo";
import designOfResearch from "./thesisComponents/designOfResearch";
import variable from "./thesisComponents/variable";
//tools
import { convertToRomanNumber } from "../../tools/romanNumbers";
import { capitalizeFirstLetter } from "../../tools/stringFunctions";
//vuex
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data: () => ({
    components: [
      advisor,
      antecedents,
      author,
      dataAnalysis,
      definitionOfTerms,
      formulationOfResearchProblem,
      goodAndServices,
      humanResources,
      hypothesis,
      instruments,
      justification,
      levelOfResearch,
      operationalizationOfVariables,
      placeOfResearch,
      populationAndSample,
      problemDefinition,
      problemStatement,
      researchArea,
      researchBudget,
      researchLine,
      schedule,
      theoricalBases,
      titleOfResearch,
      typeOfResearch,
      researchLimitations,
      objetives,
      antecedentsOfProblem,
      goods,
      services,
      fundingSources,
      actionsToDo,
      designOfResearch,
      variable
    ],
    tasks: [],
    task: null
  }),
  computed: {
    ...mapGetters({ level2Titles: "getLevel2Titles" }),
    level1Index() {
      return this.$route.params.numero - 1;
    },
    level1Title() {
      return this.$store.state.research.body.level1[this.level1Index].tag;
    }
  },
  watch: {
    $route(to, from) {
      console.log("se cambio de ruta");
      this.$emit("onRerender");
    }
  },

  methods: {
    capitalize(text) {
      return capitalizeFirstLetter(text);
    },
    romanNumber(value) {
      return convertToRomanNumber(value + 1);
    },
    componentToShow(type) {
      let selectedComponent = this.components.find(component => {
        return component.name == type;
      });
      return selectedComponent;
    },
    saveIntoStoreAndDB() {
      console.log("guardado body");
    }
  }
};
</script>

<style scoped>
.textDecoration {
  /* color: #c4cbd7; */
  /* text-decoration: underline; */
}
</style>