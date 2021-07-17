<template>
  <loading v-if="!$store.state.project.currentProject"></loading>
  <v-container v-else>
    <v-card color="tertiary" class="white--text">
      <v-card-title primary-title>
        <div>
          <div class="headline">{{ currentProject.title }}</div>
        </div>
      </v-card-title>
    </v-card>
    <v-card>
      <v-container>
        <p>Tiempo dedicado: {{ currentProject.dedicatedTime }} horas</p>
        <p>
          Estado:
          <v-chip outlined v-if="currentProject.configStatus" color="success">
            <v-icon left>mdi-wrench</v-icon>En desarrollo
          </v-chip>
          <v-chip outlined v-else color="error">
            <v-icon left>mdi-information</v-icon>Por configurar
          </v-chip>
        </p>
        <p>Último acceso: {{ currentProject.lastAccessedTime | dateFormat }}</p>

        <v-card-actions v-if="currentProject.configStatus == true">
          <v-btn outlined dark color="tertiary" @click="goToResearch"
            >Ir a la investigación</v-btn
          >
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn outlined dark color="tertiary" @click="goToConfigResearch"
            >Configurar Proyecto</v-btn
          >
        </v-card-actions>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import Loading from '../util/Loading';
import { day_month_year } from '../../../tools/timeFunctions';
import { mapState } from 'vuex';
export default {
  filters: {
    dateFormat: (value) => {
      return day_month_year(value);
    },
  },
  components: {
    Loading,
  },
  data() {
    return {};
  },
  mounted() {
    this.setStoreCurrentProject();
  },
  watch: {
    $route() {
      this.setStoreCurrentProject();
      this.$emit('onRerender');
    },
  },
  methods: {
    beforeDestroy() {
      this.$store.commit('setTasks', null);
      this.$store.commit('setCurrentProject', null);
    },
    goToConfigResearch() {
      this.$router.push({
        path: `/configuracion-proyecto/${this.$route.params.projectId}`,
      });
    },
    goToResearch() {
      this.$router.push({
        path: `/desarrollo/${this.$route.params.projectId}`,
      });
    },
    setStoreCurrentProject() {
      this.$store.dispatch('project/setCurrentProject', {
        currentProject: this.currentProject,
      });
    },
  },
  computed: {
    ...mapState('project', ['projects']),
    currentProject() {
      return this.projects.find(
        (project) => project.projectId == this.$route.params.projectId,
      );
    },
  },
};
</script>

<style scoped>
</style>
