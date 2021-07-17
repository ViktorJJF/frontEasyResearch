<template>
  <v-app>
    <!-- <core-filter/> -->
    <easy-research-overlay
      :text="$store.state.companyName"
      v-if="!$store.state.research.body.hasOwnProperty('level1')"
    ></easy-research-overlay>
    <div v-else>
      <core-toolbar @onCloakSidebar="drawer = !drawer" />

      <core-drawer
        v-if="body.hasOwnProperty('level1')"
        :drawerStatus="drawer"
      />

      <core-view />
      <core-footer />
    </div>
  </v-app>
</template>


<script>
import axios from 'axios';
import CoreView from '@/components/core/View';
import CoreToolbar from '@/components/core/Toolbar';
import CoreDrawer from '@/components/core/Drawer';
import helper from '../services/helper';
import { mapState } from 'vuex';
import { generateMatrix } from '../tools/researchFunctions';

export default {
  components: {
    CoreToolbar,
    CoreDrawer,
    CoreView,
  },
  data() {
    return {
      drawer: true,
      data: null,
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log("el drawer es: ", this.drawer);
  //   setTimeout(() => {
  //     next(vm => vm.setData(false, "kaia iama"));
  //   }, 1000);
  // },
  methods: {
    loadResearch() {
      axios
        .get('/api/project/thesis-research/get', {
          params: { projectId: this.$route.params.projectId },
        })
        .then((response) => {
          let thesisResearch = response.data.thesisResearch;
          let payload = {
            body: JSON.parse(thesisResearch.body),
            styles: JSON.parse(thesisResearch.style),
            coverPage: JSON.parse(thesisResearch.coverPage),
            references: JSON.parse(thesisResearch.references),
            annexes: JSON.parse(thesisResearch.annexes),
            images: JSON.parse(thesisResearch.images),
            tables: JSON.parse(thesisResearch.tables),
            characteristics: JSON.parse(thesisResearch.characteristics),
            researchIndexes: JSON.parse(thesisResearch.researchIndexes),
          };
          this.$store.dispatch('research/loadResearch', payload);

          //setting level2Titles to store
          let level2Titles = [];
          let partialTitles = [];
          let level1Titles = JSON.parse(thesisResearch.body).level1;

          level1Titles.forEach((level2Title) => {
            if (level2Title.hasOwnProperty('level2')) {
              level2Title.level2.forEach((partial) => {
                partialTitles.push({
                  done: false,
                  text: partial.tag,
                  type: partial.type,
                });
              });
              level2Titles.push(partialTitles);
              partialTitles = [];
            }
          });
          console.log(level2Titles);
          this.$store.dispatch('setLevel2Titles', level2Titles);
          //generando matriz
          generateMatrix();
        })
        .catch((error) => {
          console.log('hubo un error:', error);
        });
    },
    getAuthUser(name) {
      return this.$store.getters.getAuthUser(name);
    },
  },
  computed: {
    ...mapState('research', ['body']),
  },
  mounted() {
    //cargando investigacion
    this.loadResearch();
    if (!this.getAuthUser('email')) {
      helper.authUser().then((response) => {
        this.$store.dispatch('setAuthUserDetail', {
          first_name: response.profile.first_name,
          last_name: response.profile.last_name,
          email: response.user.email,
          avatar: response.profile.avatar,
        });
      });
    }
  },
};
</script>
<style lang="scss">
// @import '../../sass/style';
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>