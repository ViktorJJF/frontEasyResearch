<template>
  <v-main>
    <!-- <v-progress-circular :size="50" color="amber" indeterminate></v-progress-circular> -->
    <v-container>
      <v-fade-transition mode="out-in">
        <router-view
          @onRerender="forceRerender"
          :key="componentKey"
          v-if="$store.state.research.body.hasOwnProperty('level1')"
        />
      </v-fade-transition>
    </v-container>
  </v-main>
</template>



<script>
export default {
  data() {
    return {
      componentKey: 0,
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
