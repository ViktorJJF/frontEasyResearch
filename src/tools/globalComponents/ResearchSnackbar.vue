<template>
  <!-- <v-snackbar :value="snackbar" :color="color" :timeout="timeout">
    {{ text }}
    <v-btn dark flat @click="closeSnackbar()">Cerrar</v-btn>
  </v-snackbar>-->
  <div>
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout">
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-btn block color="primary" dark @click="snackbar = true"
      >Show Snackbar</v-btn
    >
  </div>
</template>

<script>
export default {
  props: ['color', 'text', 'snack'],
  data() {
    return {
      snackbar: false,
      timeout: 2000,
    };
  },
  computed: {
    // ...mapState(["snackbar"])
  },
  methods: {
    closeSnackbar() {
      this.$store.dispatch('setSnackbarStatus', false);
    },
  },
  mounted() {
    console.log('snackbar montado');
  },
};
</script>

<style lang="scss" scoped>
</style>
