<template>
  <v-list class="pt-0" two-line subheader v-if="projects.length > 0">
    <v-subheader>Investigaciones</v-subheader>
    <v-divider></v-divider>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-item>
          <v-list-item-avatar>
            <img :src="logo" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>EasyResearch</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-toolbar>
    <v-divider />
    <v-list-item
      v-for="project in projects"
      :key="project.id"
      :to="{name: 'Project', params: { projectId:project.projectId  }}"
    >
      <v-list-item-action>
        <v-icon medium v-if="!project.shared" light>mdi-format-list-bulleted</v-icon>
        <v-icon medium v-else light>group</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        {{project.title}}
        <v-list-item-subtitle>{{ studyType(project.type) }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
  <div v-else class="pa-4">
    <v-icon class="grey--text" large>mdi-format-list-bulleted</v-icon>
    <p class="grey--text">Aún no cuentas con investigaciones</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      logo:
        "https://images01.olx-st.com/ui/52/91/59/84/m_1539116741_54596321d6843d75754753f80c11957a.png"
    };
  },
  computed: {
    ...mapState("project", ["projects"])
  },
  methods: {
    studyType(id) {
      let type = "";
      switch (id) {
        case 1:
          type = "Proyecto de tesis";
          break;
        case 2:
          type = "Tesis";
          break;
        case 3:
          type = "Artículo científico";
          break;
        case 4:
          type = "Tesina";
          break;

        default:
          break;
      }
      return type;
    }
  },
  mounted() {
    console.log("este es el uuid: ", this.$uuid());
  }
};
</script>

<style scoped>
</style>
