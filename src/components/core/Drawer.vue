<template>
  <v-layout wrap>
    <v-navigation-drawer
      v-model="$store.state.drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
      color="#040505"
      dark
      width="300"
    >
      <v-list class="pa-0">
        <v-list-item>
          <v-list-item-avatar>
            <img :src="logo" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>EasyResearch</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-text-field
        append-icon="mdi-microphone"
        class="mt-3 mx-3"
        label="Buscar"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      ></v-text-field>

      <v-divider></v-divider>
      <v-subheader>Primeros Pasos</v-subheader>
      <v-list nav flat dense>
        <v-list-item
          active-class="secondary"
          v-for="(option, index) in options"
          :key="option.text"
          :to="{ name: option.to }"
          @click="selectedItem = index"
        >
          <v-list-item-action>
            <v-icon>{{ option.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ option.text }}</v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-subheader>Empezando el proyecto de tesis</v-subheader>
        <v-list-item :to="{ name: 'coverPage' }">
          <v-list-item-action>
            <v-icon>mdi-crop-portrait</v-icon>
          </v-list-item-action>
          <v-list-item-content>Caratula</v-list-item-content>
        </v-list-item>
        <v-list-item
          active-class="secondary"
          v-for="(element, i) in researches.level1"
          :key="i"
          class="v-list-item py-1"
          :to="{
            name: 'chapter',
            params: { numero: element.order, type: element.type },
          }"
        >
          <v-list-item-action>
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content
            >Capítulo {{ (i + 1) | roman }}.
            {{ element.tag | capitalize }}</v-list-item-content
          >
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-subheader>Trabajando en los anexos</v-subheader>
      <v-list nav flat dense>
        <v-list-item
          active-class="secondary"
          v-for="annex in annexes"
          :key="annex.text"
          :to="{ name: annex.to }"
        >
          <v-list-item-action>
            <v-icon>{{ annex.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ annex.text }}</v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item :to="{ name: 'additionalInformation' }">
          <v-list-item-action>
            <v-icon>mdi-alert-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>Información adicional</v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list class="pa-0">
        <v-list-item :to="{ name: 'settings' }">
          <v-list-item-action>
            <v-icon>mdi-wrench</v-icon>
          </v-list-item-action>
          <v-list-item-content>Ajustes</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
// Utilities
import { mapState } from 'vuex';
import { convertToRomanNumber } from '../../tools/romanNumbers';
import { capitalizeFirstLetter } from '../../tools/stringFunctions';
export default {
  filters: {
    roman: function (value) {
      return convertToRomanNumber(value);
    },
    capitalize: (value) => {
      return capitalizeFirstLetter(value);
    },
  },
  data() {
    return {
      selectedItem: null,
      drawerLocal: null,
      researches: {},
      logo:
        'https://images01.olx-st.com/ui/52/91/59/84/m_1539116741_54596321d6843d75754753f80c11957a.png',
      options: [
        {
          to: 'start',
          icon: 'mdi-home',
          text: 'Inicio',
        },
        {
          to: 'design',
          icon: 'mdi-brush',
          text: 'Escogiendo el tipo y diseño de la investigación',
        },
        {
          to: 'title',
          icon: 'mdi-format-title',
          text: '¿Cuál será mi título?',
        },
        {
          to: 'variable',
          icon: 'mdi-alphabetical',
          text: '¿Cuales son mis variables?',
        },
        // {
        //   to: "instruments",
        //   icon: "mdi-alpha",
        //   text: "Sobre los instrumentos de la investigación"
        // },
        {
          to: 'matrix',
          icon: 'mdi-grid',
          text: 'Diseñando la matriz de consistencia',
        },
        {
          to: 'references',
          icon: 'mdi-book-open-variant',
          text: 'Referencias',
        },
      ],
      annexes: [
        {
          to: 'annexesList',
          icon: 'mdi-format-list-bulleted',
          text: 'Listado de anexos',
        },
        {
          to: 'operationalizationMatrix',
          icon: 'mdi-view-quilt',
          text: 'Matriz de operacionalización de variables',
        },
      ],
      responsive: false,
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
    },
    ...mapState('research', ['body']),
  },
  mounted() {
    this.getResearchFromStore();
  },
  methods: {
    getResearchFromStore() {
      this.researches = this.body;
    },
  },
};
</script>
<style lang="scss">
.activeItem {
  color: #ffffff;
}
</style>
