<template>
  <div>
    <component :data="data" :is="dynamicComponent(type)"></component>
    <!-- <h1>Probando componente dinamico</h1> -->
  </div>
</template>

<script>
import advisor from '@/views/pages/thesisComponents/advisor';
import generalObjetive from '@/views/pages/thesisComponents/generalObjetive';
import specificObjetive from '@/views/pages/thesisComponents/specificObjetive';
import generalHypothesis from '@/views/pages/thesisComponents/generalHypothesis';
import specificHypothesis from '@/views/pages/thesisComponents/specificHypothesis';
import generalProblem from '@/views/pages/thesisComponents/generalProblem';
import specificProblem from '@/views/pages/thesisComponents/specificProblem';
import problemStatement from '@/views/pages/thesisComponents/problemStatement';
import identificationOfResearchProblem from '@/views/pages/thesisComponents/identificationOfResearchProblem';
import problemFormulation from '@/views/pages/thesisComponents/problemFormulation';
import identifyingVariables from '@/views/pages/thesisComponents/identifyingVariables';
import variableCharacteristics from '@/views/pages/thesisComponents/variableCharacteristics';
import internationalAntecedent from '@/views/pages/thesisComponents/internationalAntecedent';
import nationalAntecedent from '@/views/pages/thesisComponents/nationalAntecedent';
import localAntecedent from '@/views/pages/thesisComponents/localAntecedent';
import population from '@/views/pages/thesisComponents/population';
import sample from '@/views/pages/thesisComponents/sample';
import basicActivities from '@/views/pages/thesisComponents/basicActivities';
import tentativeTOC from '@/views/pages/thesisComponents/tentativeTOC';
import titleOfResearch from '@/views/pages/thesisComponents/titleOfResearch';
export default {
  props: ['type', 'data'],
  data() {
    return {
      components: [
        advisor,
        generalObjetive,
        specificObjetive,
        generalHypothesis,
        specificHypothesis,
        generalProblem,
        specificProblem,
        problemStatement,
        identificationOfResearchProblem,
        problemFormulation,
        identifyingVariables,
        variableCharacteristics,
        internationalAntecedent,
        nationalAntecedent,
        localAntecedent,
        population,
        sample,
        basicActivities,
        tentativeTOC,
        titleOfResearch,
      ],
    };
  },
  methods: {
    dynamicComponent(type) {
      console.log('se empezara a buscar el tipo: ', type);
      let index = this.components.findIndex(
        (component) => component.name == type,
      );
      console.log('se retorno el index: ', index);
      return this.components[index];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
