<template>
  <v-app>
    <core-toolbar />
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
    <core-footer />
  </v-app>
</template>

<script>
import coreToolbar from './core/toolbar';
export default {
  components: {
    coreToolbar,
  },
  mounted() {
    console.log('jaja');
  },
};
</script>

<style lang="scss" scoped>
</style>
