<template>
  <v-row v-show="citationsData.length > 0">
    <v-col cols="12">
      <strong>Referencias usadas en este párrafo:</strong>
      <v-chip
        class="mx-1"
        v-model="cita.status"
        color="orange"
        text-color="white"
        v-for="cita in citationsData"
        :key="cita.id"
        >{{ getCitation(cita.referenceId, cita.typeOfCitation) }}</v-chip
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['citationsData'],
  methods: {
    getCitation(referenceId, type) {
      return this.$store.getters['research/getReference'](referenceId, type);
    },
  },
};
</script>

<style scoped>
</style>
