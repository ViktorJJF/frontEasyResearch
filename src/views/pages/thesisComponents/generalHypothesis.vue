<template>
  <research-element-card :title="data.tag">
    <exp-research-element slot="body" :type="data.type" :data="data.values"></exp-research-element>
    <v-container slot="help">
      El título de tu investigación es:
      <strong>{{researchTitle}}</strong>
      <v-divider class="mb-5"></v-divider>
      <p>La hipótesis general se realiza expresando tu título en forma afirmativa y negativa.</p>
      <strong>Por ejemplo:</strong>
      <v-card outlined class="pa-3">
        <p>¿{{researchTitle}}?</p>
      </v-card>
    </v-container>
  </research-element-card>
</template>

<script>
export default {
  props: ["data"],
  name: "generalHypothesis",
  computed: {
    researchTitle() {
      return this.$store.state.research.characteristics.title
        ? this.$store.state.research.characteristics.title.fullTitle
        : "Aún no definiste tu título";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>