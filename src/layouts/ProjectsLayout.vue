<template>
  <v-app>
    <!-- <v-navigation-drawer v-model="drawer" fixed app></v-navigation-drawer> -->
    <v-layout wrap>
      <v-navigation-drawer
        app
        id="app-drawer"
        mobile-breakpoint="991"
        v-model="$store.state.drawer"
        fixed
        :clipped="$vuetify.breakpoint.lgAndUp"
      >
        <v-divider></v-divider>

        <projects-list></projects-list>

        <v-divider></v-divider>
        <create-project></create-project>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item color="orange" ripple>
            <v-list-item-action>
              <v-icon light color="orange">mdi-information-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                >Modo estudiante invitado! aea!</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
      </v-navigation-drawer>
    </v-layout>

    <core-toolbar />
    <v-main>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view
            @onRerender="forceRerender"
            :key="componentKey"
            v-if="projects.length > 0"
          ></router-view>
        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import axios from 'axios';
import ProjectsList from '@/views/projects/Projects-List';
import CreateProject from '@/views/projects/Create-Project';
import { mapState } from 'vuex';

export default {
  components: {
    ProjectsList,
    CreateProject,
  },
  data: () => ({
    componentKey: 0,
  }),
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    getProjectsFromDB() {
      axios
        .get('/api/projects')
        .then((response) => {
          this.setProjectsToStore(response.data.projects);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setProjectsToStore(projects) {
      this.$store.dispatch('project/loadProjects', { projects: projects });
      console.log('contenido del proyecto: ', this.projects);
    },
  },
  created() {
    this.getProjectsFromDB();
  },
  computed: {
    ...mapState('project', ['projects']),
  },
};
</script>
