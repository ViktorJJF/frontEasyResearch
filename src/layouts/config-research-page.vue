<template>
  <v-app>
    <core-toolbar />
    <v-main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CoreToolbar from '@/components/core/Toolbar';
export default {
  components: {
    CoreToolbar,
  },
};
</script>

<style lang="scss">
// @import "../../sass/style";
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>