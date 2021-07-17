<template>
  <research-chapter-card>
    <div slot="body">
      <v-alert v-if="!typeofResearchFromStore" :value="true" type="error" icon="warning">
        Parece que aún no seleccionaste un tipo de investigación :( puedes hacerlo entrando a esta
        <router-link class="link" :to="{name:'design'}">sección</router-link>
      </v-alert>
      <p v-else>
        El tipo de investigación que seleccionaste en pasos anteriores fue
        <strong>{{typeofResearchFromStore}}</strong>
      </p>
    </div>
  </research-chapter-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "typeOfResearch",
  props: ["index"],
  data() {
    return {};
  },
  computed: {
    ...mapState("research", {
      typeofResearchFromStore: state => state.characteristics.type
    })
  },
  mounted() {
    console.log("esto es type of research");
  }
};
</script>

<style scoped>
</style>