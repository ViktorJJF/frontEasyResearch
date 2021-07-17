<template>
  <div id="app">
    <v-app>
      <core-toolbar />
      <router-view></router-view>
      <!-- <core-footer /> -->
      <success-message />
      <error-message />
      <loading-screen />
    </v-app>
  </div>
</template>
<script>
import SuccessMessage from '@/components/common/successMessage';
import ErrorMessage from '@/components/common/errorMessage';
import LoadingScreen from '@/components/common/loadingScreen';
import coreToolbar from '@/components/core/Toolbar';
export default {
  components: {
    SuccessMessage,
    ErrorMessage,
    LoadingScreen,
    coreToolbar,
  },
};
</script>
<style lang="scss"></style>

