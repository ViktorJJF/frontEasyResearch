<template>
  <div>
    <research-chapter-card>
      <div slot="body">
        <v-alert dark v-if="!designOfResearch" :value="true" color="error" icon="warning">
          Parece que aún no seleccionaste un diseño de investigación :( puedes hacerlo entrando a esta
          <router-link :to="{name:'design'}">sección</router-link>
        </v-alert>
        <p v-else>
          El diseño de investigación que seleccionaste en pasos anteriores fue
          <strong>{{designOfResearch}}</strong>
        </p>
      </div>
    </research-chapter-card>
    <research-element-card :title="completeObject.tag">
      <exp-research-element slot="body" :type="completeObject.type" :data="completeObject.values"></exp-research-element>
      <v-container slot="help">esta ayudita te sera util para la justificacion</v-container>
    </research-element-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "designOfResearch",
  props: ["index"],
  data() {
    return {
      completeObject: {},
      citations: []
    };
  },
  created() {
    this.getDesignOfResearch();
  },
  methods: {
    getDesignOfResearch() {
      let index = this.getResearchIndex("designOfResearch");
      this.completeObject = this.$store.getters["research/getResearchData"](
        index
      );
      this.citations = this.completeObject.citations;
    }
  },
  computed: {
    ...mapState("research", {
      designOfResearch: state => state.characteristics.design
    }),
    ...mapGetters("research", ["getResearchIndex"])
  },
  mounted() {}
};
</script>

<style scoped>
</style>