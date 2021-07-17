<template>
  <research-chapter-card>
    <div slot="body">
      <v-alert v-if="!levelOfResearchFromStore" :value="true" type="error" icon="warning">
        Parece que aún no seleccionaste un nivel de investigación :( puedes hacerlo entrando a esta
        <router-link class="link" :to="{name:'design'}">sección</router-link>
      </v-alert>
      <p v-else>
        El tipo de investigación que seleccionaste pasos antesiores fue
        <strong>{{levelOfResearchFromStore}}</strong>
      </p>
    </div>
  </research-chapter-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "levelOfResearch",
  props: ["index"],
  data() {
    return {};
  },
  computed: {
    ...mapState("research", {
      levelOfResearchFromStore: state => state.characteristics.level
    })
  }
};
</script>

<style scoped>
</style>