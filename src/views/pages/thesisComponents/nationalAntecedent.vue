<template>
  <research-element-card :title="data.tag">
    <exp-research-element slot="body" :type="data.type" :data="data.values"></exp-research-element>
    <v-container slot="help">Ayuda para el problema especifico</v-container>
  </research-element-card>
</template>

<script>
export default {
  props: ["data"],
  name: "nationalAntecedent"
};
</script>

<style lang="scss" scoped>
</style>