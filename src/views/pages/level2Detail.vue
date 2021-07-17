<template>
  <div>
    <component :is="componentToShow($route.params.level2)"></component>
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
export default {
  data() {
    return {
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
      ]
    };
  },
  mounted() {
    console.log("se entro a: ", this.$route.params.type);
  },
  methods: {
    componentToShow(type) {
      let selectedComponent = this.components.find(component => {
        return component.name == type;
      });
      return selectedComponent;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>