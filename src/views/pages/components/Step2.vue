<template>
  <v-container fluid>
    <easy-research-overlay
      v-if="overlay"
      :darkMode="true"
      text="Generando tablero de control"
    ></easy-research-overlay>
    <h1 class="text-center mb-4">Verifica el formato de tu universidad</h1>
    <v-alert
      prominent
      text
      dense
      color="tertiary"
      icon="mdi-information-outline"
      border="left"
    >
      Ya estas a punto de generar tu primer panel de control para
      <strong>empezar tu proyecto de tesis!</strong>
      En esta sección deberás confirmar que el formato seleccionado por el
      sistema es conforme a lo que solicita tu universidad. De haber algun
      error, podrás editarlo a tu gusto.
      <strong>¡Este es el paso más importante!</strong> A partir de aquí se te
      será asignado un panel de control.
    </v-alert>
    <v-layout v-if="!level1Elements || selectedSentinel == false" row wrap>
      <v-alert
        prominent
        text
        dense
        color="error"
        icon="mdi-shield-lock-outline"
        border="left"
      >
        Lamentablemente aún no contamos con el formato de proyecto de tesis de
        la
        <strong>{{ universityName }}</strong>
        <div>
          <strong>Aún queda una opción!</strong> Puedes escoger el formato de
          alguna de estas universidades y editarlo acorde a lo que solicita tu
          universidad.
        </div>
      </v-alert>
      <v-layout row wrap justify-center>
        <v-flex xs6 sm6>
          <v-select
            @change="
              loadFallbackTemplate(
                selectedTemplate.template,
                selectedTemplate.name,
              )
            "
            v-model="selectedTemplate"
            :return-object="true"
            item-text="name"
            :items="templates"
            label="Escoge alguna universidad"
          ></v-select>
        </v-flex>
        <v-btn outlined color="success" dark @click="saveNewTemplate()"
          >Guardar formato</v-btn
        >
      </v-layout>
    </v-layout>
    <v-divider></v-divider>
    <v-fade-transition v-if="level1Elements">
      <v-layout row>
        <v-flex sm12>
          <ul class="mb-4">
            <li>
              <strong>Universidad Seleccionada:</strong>
              <span class="headline">{{ title }}</span>
            </li>
          </ul>
          <ol class="pre">
            <h3
              v-for="(level1Element, index) in level1Elements"
              :key="level1Element.tag"
              class="card cloak-list-level1 mb-4"
            >
              <div class="title text-uppercase mb-4">
                {{ level1Element.type == 'chapter' ? 'CAPÍTULO ' : ''
                }}{{ ToRomanNumber(index + 1) }}. {{ level1Element.tag }}
              </div>
              <div class="card-body">
                <div
                  v-for="level1Element in level1Elements"
                  :key="level1Element.id"
                ></div>
                <list-subtitles
                  :parentOrder="level1Element.order"
                  :level2Titles="level1Element.level2"
                ></list-subtitles>
              </div>
            </h3>
          </ol>
        </v-flex>
      </v-layout>
    </v-fade-transition>
    <v-layout row justify-end>
      <v-btn
        outlined
        color="error"
        @click="
          desactivateCurrentStep(2);
          updateStepNumber(1);
        "
        >Atrás</v-btn
      >
      <v-btn class="ml-3" color="primary" @click="beginGeneratingDashboard()">{{
        link.text
      }}</v-btn>
    </v-layout>
    <v-overlay :value="overlay"></v-overlay>
  </v-container>
</template>

<script>
import axios from 'axios';
import ListSubtitles from './ListSubtitles.vue';
import { convertToRomanNumber } from '../../../tools/romanNumbers';
import {
  initializeValues,
  initializeTables,
  initializeCharacteristics,
  initializeAnnexes,
} from './../../../tools/initialValues';
export default {
  components: { ListSubtitles },
  data() {
    return {
      link: { icon: 'dashboard', text: 'Finalizar', route: '/dashboard' },
      selectedSentinel: false,
      level1Elements: [],
      title: '',
      templates: [],
      selectedTemplate: null,
      overlay: false,
    };
  },
  mounted: function () {
    this.loadThesisTemplate();
    this.loadAllThesisTemplates();
    console.log(
      'este es el perfil de investigador: ',
      this.$store.state.researchConfig.researcherProfile.country_id,
    );
  },
  methods: {
    saveResearcherProfile() {
      return new Promise((resolve) => {
        axios
          .post('/api/researcher-profiles', {
            country_id: this.$store.state.researchConfig.researcherProfile
              .country_id,
            region_id: this.$store.state.researchConfig.researcherProfile
              .region_id,
            university_id: this.$store.state.researchConfig.researcherProfile
              .university_id,
            faculty_id: this.$store.state.researchConfig.researcherProfile
              .faculty_id,
            school_id: this.$store.state.researchConfig.researcherProfile
              .school_id,
            goal_degree: this.$store.state.researchConfig.researcherProfile
              .goal_degree,
            current_degree: this.$store.state.researchConfig.researcherProfile
              .current_degree,
            advisor: this.$store.state.researchConfig.researcherProfile.advisor,
          })
          .then((response) => {
            resolve();
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    },
    saveNewTemplate() {
      let payloadStyle = this.selectedTemplate.style;
      this.$store.dispatch('researchConfig/loadThesisStyles', payloadStyle);
      let payloadTemplate = { template: this.selectedTemplate.template };
      this.$store.dispatch(
        'researchConfig/loadThesisTemplate',
        payloadTemplate,
      );
      this.selectedSentinel = true; //was selected a fallback university
    },
    loadFallbackTemplate(template, universityName) {
      this.level1Elements = template.level1;
      this.title = universityName;
    },
    loadAllThesisTemplates() {
      if (!this.level1Elements) {
        axios
          .get('/api/thesis-template/all')
          .then((res) => {
            if (res.data.ok) {
              console.log(res.data);
              this.templates = res.data.payload;
            } else {
              // error msg
              console.error(res.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.selectedSentinel = true;
      }
    },
    desactivateCurrentStep(value) {
      this.$emit('desactivateCurrentStep', value);
    },
    updateStepNumber(value) {
      this.$emit('stepNumber', value);
    },
    generateThesisLevel1() {
      this.level1Elements.level1;
    },
    sortOrder(array) {
      array.forEach((element, index) => {
        element.order = index + 1;
      });
    },
    loadThesisTemplate() {
      this.level1Elements = this.$store.state.researchConfig.template.level1;
      this.title = this.universityName;
    },
    ToRomanNumber(number) {
      return convertToRomanNumber(number);
    },
    async beginGeneratingDashboard() {
      this.overlay = true; //activating overlay
      //saving researcher profile
      await this.saveResearcherProfile();
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
    goToDashboard() {
      console.log('yendo al dashboard');
      console.log('Router: ', this.$route.params);
      this.$router.push({
        path: '/desarrollo/' + this.$route.params.projectId,
      });
    },
  },
  computed: {
    universityName() {
      return this.$store.state.researchConfig.coverPageTemplate
        .basicInformation[0].value;
    },
  },
};
</script>

<style scoped>
</style>