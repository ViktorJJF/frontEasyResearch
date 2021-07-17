<template>
  <v-container fluid>
    <v-layout row justify-space-around>
      <v-flex md12 lg12>
        <h1 class="text-center">
          Compruebe si la carátula difiere a lo especificado por su Universidad
        </h1>
        <!-- Each sheet element should have the class "sheet" -->
        <!-- "padding-**mm" is optional: you can set 10, 15, 20 or 25 -->
        <cover-page-sheet
          v-if="coverPagePreview.length > 0"
          :data="coverPagePreview"
        ></cover-page-sheet>
      </v-flex>
    </v-layout>
    <v-layout row justify-end>
      <v-btn
        color="error"
        outlined
        @click="
          desactivateCurrentStep(4);
          updateStepNumber(3);
        "
        >Atrás</v-btn
      >
      <v-btn
        class="ml-3"
        outlined
        color="success"
        @click="beginGeneratingDashboard()"
        >{{ link.text }}</v-btn
      >
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import { customCopyObject } from './../../../tools/customCopyObject';
import coverPageSheet from '../components/coverPageSheet';
import {
  initializeValues,
  initializeTables,
  initializeCharacteristics,
  initializeAnnexes,
} from './../../../tools/initialValues';
import { generateCoverPageTemplate } from '../../../tools/CoverPageGenerator';
export default {
  components: {
    coverPageSheet,
  },
  data() {
    return {
      link: { icon: 'dashboard', text: 'Finalizar', route: '/dashboard' },
      coverPagePreview: [],
    };
  },
  mounted() {
    console.log('se inicio el componente 4');
    let template = customCopyObject(
      this.$store.state.researchConfig.coverPageTemplate.template,
    );
    let data = customCopyObject(
      this.$store.state.researchConfig.coverPageTemplate.basicInformation,
    );

    let payload = {
      coverPageTemplate: template,
      basicInformation: data,
    };
    generateCoverPageTemplate((generatedCoverPage) => {
      this.loadCoverPageTemplate(generatedCoverPage);
      console.log('se genero la caratula con: ', generatedCoverPage);
    }, payload);
  },
  methods: {
    desactivateCurrentStep(value) {
      this.$emit('desactivateCurrentStep', value);
    },
    updateStepNumber(value) {
      this.$emit('stepNumber', value);
    },
    saveIntoDatabase(callback, researchIndexes) {
      axios
        .post('/api/project/thesis-research', {
          project_id: this.$store.state.project.currentProject.id,
          body: JSON.stringify(this.$store.state.researchConfig.template),
          style: JSON.stringify(this.$store.state.researchConfig.styles),
          coverPage: JSON.stringify(
            this.$store.state.researchConfig.coverPageTemplate,
          ),
          tables: JSON.stringify(initializeTables()),
          characteristics: JSON.stringify(initializeCharacteristics()),
          annexes: JSON.stringify(initializeAnnexes()),
          researchIndexes: JSON.stringify(researchIndexes),
        })
        .then((response) => {
          console.log(response);
          //update configStatus from Store
          this.$store.dispatch('project/updateConfigStatus', {
            configStatus: true,
          });
          //update configStatus from DB
          axios
            .post('/api/project/config-status', {
              projectId: this.$route.params.projectId,
              configStatus: true,
            })
            .then((response) => {
              console.log(response);
              callback(true);
            })
            .catch((error) => {
              callback(false);
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    beginGeneratingDashboard() {
      initializeValues((template, researchIndexes) => {
        this.$store.dispatch(
          'researchConfig/initializeResearchConfigDynamically',
          template,
        );
        this.saveIntoDatabase((callback) => {
          if (callback) {
            this.goToDashboard();
          } else {
            console.log('algo salió mal al generar el dashboard...');
          }
        }, researchIndexes);
      });
    },
    goToDashboard() {
      console.log('yendo al dashboard');
      console.log('Router: ', this.$route.params);
      this.$router.push({
        path: '/desarrollo/' + this.$route.params.projectId,
      });
    },
    loadCoverPageTemplate(generatedCoverPage) {
      this.coverPagePreview = generatedCoverPage;
    },
  },
};
</script>

<style scoped>
</style>