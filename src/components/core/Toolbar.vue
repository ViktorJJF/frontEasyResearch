<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    fixed
    dark
    color="primary"
  >
    <v-toolbar-title class="ml-0 pl-3">
      <v-app-bar-nav-icon
        v-if="this.$route.name != 'configSteps'"
        @click="$store.state.drawer = !$store.state.drawer"
      ></v-app-bar-nav-icon>
      <span class="hidden-sm-and-down">{{
        currentProject != null ? currentProject.title : 'EasyResearch'
      }}</span>
    </v-toolbar-title>
    <v-spacer />
    <thesis-project-generator-button class="mr-3" />
    <v-toolbar-items class="hidden-sm-and-down">
      <v-flex align-center layout py-2>
        <v-btn
          v-for="button in buttons"
          :key="button.id"
          outlined
          color="white"
          dark
          :to="button.to"
          >Proyectos</v-btn
        >
        <v-menu
          bottom
          :close-on-content-click="false"
          :nudge-width="100"
          offset-x
        >
          <template v-slot:activator="{ on }">
            <v-btn color="white" text v-on="on" dark>
              <v-icon color="white">mdi-account</v-icon>
              {{ getAuthUserEmail() }}
              <v-icon dark>mdi-arrow-down-drop-circle-outline</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img
                    src="data:image/png;base64,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"
                    alt="John"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{
                    getAuthUserFullName()
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-item
                v-for="link in links"
                :key="link.text"
                router
                :to="link.route"
              >
                <v-list-item-title>{{ link.text }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click.prevent="logout">
                <v-list-item-title>Salir</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-flex>
    </v-toolbar-items>
    <div class="hidden-md-and-up">
      <v-menu class="offset-y">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">
            <v-icon>mdi-wrench</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="button in buttons"
            :key="button.id"
            :to="button.to"
          >
            <v-list-item-title>{{ button.name }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="logout">
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import helper from '@/services/helper';
export default {
  data: () => ({
    links: [
      { icon: 'dashboard', text: 'Mi perfil', route: '/dashboard' },
      { icon: 'folder', text: 'Configuración', route: '/user-profile' },
    ],
    responsive: false,
    responsiveInput: false,
    buttons: [{ id: 1, name: 'Proyectos', to: { name: 'Info' } }],
  }),
  mounted() {
    if (!this.getAuthUser('email')) {
      helper.authUser().then((response) => {
        console.log('respuesta: ', response);
        this.$store.dispatch('setAuthUserDetail', {
          first_name: response.profile.first_name,
          last_name: response.profile.last_name,
          email: response.user.email,
          avatar: response.profile.avatar,
        });
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResponsiveInverted);
  },
  computed: {
    ...mapState('project', ['currentProject']),
  },
  methods: {
    getAuthUser(name) {
      return this.$store.getters.getAuthUser(name);
    },
    onCloakSidebar() {
      this.$store.dispatch('setDrawerStatus');
      // this.$emit("onCloakSidebar");
    },
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    logout() {
      //   helper.logout().then(() => {
      //     this.$store.dispatch('resetAuthUserDetail');
      //     this.$router.replace('/login');
      //   });
    },
    getAuthUserFullName() {
      return this.$store.getters.getAuthUserFullName;
    },
    getAuthUserEmail() {
      return this.$store.getters.getAuthUserEmail;
    },
  },
};
</script>

<style>
</style>
