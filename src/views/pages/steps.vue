<template>
  <v-container>
    <v-stepper class="max-width" v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"
          >Paso 1: Datos Generales</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"
          >Paso 2: Formato</v-stepper-step
        >

        <v-divider></v-divider>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <step1
            @activateNextStep="activateStep"
            @stepNumber="updateStepNumber"
          />
        </v-stepper-content>

        <v-stepper-content step="2">
          <step2
            v-if="activateStep2"
            @activateNextStep="activateStep"
            @desactivateCurrentStep="desactivateStep"
            @stepNumber="updateStepNumber"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import Step1 from './components/Step1.vue';
import Step2 from './components/Step2.vue';
// import Step3 from "./components/Step3.vue";
// import Step4 from "./components/Step4.vue";

export default {
  data() {
    return {
      e1: 1,
      activateStep2: false,
      // activateStep3: false,
      // activateStep4: false
    };
  },
  mounted() {},
  components: {
    Step1,
    Step2,
    // Step3,
    // Step4,
  },
  methods: {
    updateStepNumber(value) {
      this.e1 = value;
    },
    activateStep(stepNumber) {
      console.log('se procedera a activar el paso: ', stepNumber);
      switch (stepNumber) {
        case 2:
          this.activateStep2 = true;
          break;
        default:
          break;
      }
    },
    desactivateStep(stepNumber) {
      switch (stepNumber) {
        case 2:
          console.log('se desactivo el paso 2');
          this.activateStep2 = false;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.max-width {
  margin: 0 auto;
  width: 900px;
}
</style>