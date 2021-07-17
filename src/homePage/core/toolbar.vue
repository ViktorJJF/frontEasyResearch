<template>
  <v-app-bar app dark color="primary">
    <router-link to="/">
      <v-img
        :src="'/images/graduate-icon.png'"
        class="mr-5"
        contain
        height="48"
        width="48"
        max-width="48"
      />
    </router-link>
    <span class="title ml-3 mr-5">{{ $store.state.companyName }}</span>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-for="button in buttons" :key="button.id" text :to="button.to">{{
        button.name
      }}</v-btn>
    </v-toolbar-items>
    <div class="hidden-md-and-up">
      <v-menu class="offset-y">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">
            <v-icon>mdi-wrench</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="button in buttons"
            :key="button.id"
            :to="button.to"
          >
            <v-list-item-title>{{ button.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        { id: 1, name: 'Beneficios', to: { name: 'benefits' } },
        { id: 2, name: 'Precios', to: { name: 'prices' } },
        { id: 3, name: 'Contáctanos', to: { name: 'contact' } },
        { id: 4, name: 'Iniciar Sesión', to: { name: 'login' } },
        { id: 5, name: 'Registrarse', to: { name: 'register' } },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
