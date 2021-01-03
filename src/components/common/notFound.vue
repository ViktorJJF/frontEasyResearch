<template>
  <div class="dt-root">
    <div class="dt-root__inner">
      <div class="dt-page--container">
        <!-- 404 Page -->
        <div class="error-page text-center">
          <!-- Title -->
          <h1 class="titleDrift">404</h1>
          <!-- /title -->

          <p class="display-2 text-dark mb-7">¡Perdón! Página no encontrada</p>
          <p class="mb-10">
            El enlace que seguiste probablemente está roto, o fue removido.
          </p>

          <!-- Search Box -->
          <form class="search-box right-side-icon">
            <v-btn large color="primary" @click="goOut">Volver</v-btn>
          </form>
          <!-- /search box -->

          <!---->
        </div>
        <!-- /404 page -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goOut() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped></style>
