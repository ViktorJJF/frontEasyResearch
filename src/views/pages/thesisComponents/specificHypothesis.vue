<template>
  <research-element-card :title="data.tag">
    <exp-research-element slot="body" :type="data.type" :data="data.values"></exp-research-element>
    <v-container slot="help">
      El título de tu investigación es:
      <strong>{{researchTitle}}</strong>
      <v-divider></v-divider>
      <p>Las hipótesis específicas se realizan en base a</p>
    </v-container>
  </research-element-card>
</template>

<script>
export default {
  props: ["data"],
  name: "specificHypothesis",
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