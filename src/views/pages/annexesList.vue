<template>
  <research-card @onSave title="Listado de anexos">
    <div slot="body">
      <ul>
        <li v-for="annex in annexes" :key="annex.id">{{ annex.tag }}</li>
      </ul>
    </div>
    <div slot="contentModal">
      <p>
        <strong>Las variables en la investigación, representan un concepto de vital importancia dentro de un proyecto. Las variables, son los conceptos que forman enunciados de un tipo particular denominado hipótesis.</strong>
      </p>
    </div>
  </research-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("research", ["annexes"])
  }
};
</script>

<style lang="scss" scoped>
</style>