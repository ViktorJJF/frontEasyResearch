<template>
  <v-container fluid>
    <v-layout row justify-space-around>
      <v-flex md12 lg5>
        <material-card
          color="orange"
          title="Estilos"
          text="Estilos que se aplicarán por defecto a todo el proyecto de tesis"
        >
          <v-list :three-line="true">
            <v-list-item>
              <v-list-item-title>
                <span>Tipo de Fuente:</span>
                {{styles.defaultFont[0]}}
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-title>
                <span>Tamaño de Fuente:</span>
                {{styles.defaultFontSize}}
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-title>
                <span>Espacio entre lineas:</span>
                {{styles.defaultSpacing}} (Doble Espacio)
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title>
                <span>Espacio antes de cada párrafo:</span>
                {{styles.spaceBefore?'Sí':'No'}}
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title>
                <span>Alineación:</span>
                {{styles.defaultAlignment=='justify'?'Justificado':'Sin justificar'}}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </material-card>
      </v-flex>
      <v-flex md12 lg5>
        <material-card
          color="orange"
          title="Márgenes"
          text="Márgenes que se aplicarán por defecto a todo el proyecto de tesis"
        >
          <v-list :three-line="true">
            <v-list-item>
              <v-list-item-title>
                <span>Unidades:</span>
                {{margins.units}}
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-title>
                <span>Margen Superior:</span>
                {{margins.top}}
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-title>
                <span>Margen Inferior:</span>
                {{margins.bottom}}
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title>
                <span>Margen Izquierdo:</span>
                {{margins.leftHand}}
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title>
                <span>Margen Derecho</span>
                {{margins.rightHand}}
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title>
                <span>Margenes Especiales</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <span>Margen Superior al inicio de cada capítulo:</span>
                {{margins.specialMargins.top}}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </material-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-end>
      <v-btn outlined color="error" @click="desactivateCurrentStep(3);updateStepNumber(2)">Atrás</v-btn>
      <v-btn
        outlined
        class="ml-3"
        color="success"
        @click="activateNextStep(4);updateStepNumber(4)"
      >Siguiente</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      styles: {
        defaultFont: ["Times New Roman", "Arial"],
        defaultFontSize: 12,
        defaultSpacing: 2,
        spaceBefore: true,
        defaultIndent: 5,
        defaultAlignment: "justify"
      },
      margins: {
        units: "cm",
        top: 6,
        bottom: 3,
        leftHand: 4,
        rightHand: 3,
        specialMargins: {
          specialSections: ["chapter", "introduction"],
          top: 7
        }
      }
    };
  },
  computed: {},
  mounted: function() {
    console.log("se inicio el componente 3");
    this.getStyles();
    this.getMargins();
  },
  methods: {
    desactivateCurrentStep(value) {
      this.$emit("desactivateCurrentStep", value);
    },
    updateStepNumber(value) {
      this.$emit("stepNumber", value);
    },
    activateNextStep(value) {
      this.$emit("activateNextStep", value);
    },
    getStyles() {
      //   this.styles = this.$store.state.researchConfig.styles.styles;
      //   console.log(
      //     "el default font es: ",
      //     this.$store.state.researchConfig.styles
      //   );
      //   this.margins = this.$store.state.researchConfig.styles.margins;
      //   console.log(
      //     "Default margins es: ",
      //     this.$store.state.researchConfig.styles.margins
      //   );
    },
    getMargins() {}
  }
};
</script>

<style scoped>
span {
  font-weight: bold;
}
</style>