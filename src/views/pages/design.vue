<template>
  <div>
    <research-card @onSave="saveIntoStoreAndDB" title="Diseño de la investigacion">
      <div slot="body">
        <h3>¿Cuál será el tipo de investigación? (Alcance)</h3>
        {{selectedType}}
        <v-radio-group color="primary" v-model="selectedType" row>
          <v-radio
            color="primary"
            v-for="types in typeList"
            :key="'b'+types.id"
            :label="types.value"
            :value="types.value"
          ></v-radio>
        </v-radio-group>
        <h3>¿Cuál será el nivel de tu investigación?</h3>
        <v-radio-group color="primary" v-model="selectedLevel" row>
          <v-radio
            color="primary"
            v-for="level in levelList"
            :key="'a'+level.id"
            :label="level.value"
            :value="level.value"
          ></v-radio>
        </v-radio-group>
        <h3>¿Cuál será el diseño de tu investigación?</h3>
        <v-radio-group color="primary" v-model="selectedDesign" row>
          <v-radio
            color="primary"
            v-for="design in designList"
            :key="'a'+design.id"
            :label="design.value"
            :value="design.value"
          ></v-radio>
        </v-radio-group>
      </div>
      <div slot="contentModal">
        <p>
          <strong>El diseño de la investigación es el plan de estrategias que se llevará a cabo para lograr los objetivos de la tesis.</strong> El diseño sirve para recolectar la información que se necesita para probar la hipótesis. Por esa razón, es lógico que el diseño venga luego de tener claro el planteamiento del problema.
          Una investigación puede desarrollarse con base a varios diseños de investigación, pero lo más recomendable es utilizar un único diseño, porque estos requieren de recursos y hacer uso de más de uno puede elevar mucho los costos de la tesis. Otra razón, es que para trabajar con varios diseños de investigación se requiere de experiencia en la investigación y, es probable, que un estudiante de pregrado no haya adquirido los conocimientos necesarios.
        </p>
        <h3>Tipos de diseño según Sampieri</h3>
        <v-img :src="imgDesignSrc" aspect-ratio="1.7" contain></v-img>
      </div>
    </research-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { Paragraph } from "../../classes/Paragraph";
export default {
  data() {
    return {
      designList: [
        {
          id: 1,
          type: "exploratory",
          value: "Estudios de alcance Exploratorio"
        },
        {
          id: 2,
          type: "descriptive",
          value: "Estudios de alcance Descriptivos"
        },
        {
          id: 3,
          type: "correlational",
          value: "Estudios de alcance Correlacional"
        },
        {
          id: 4,
          type: "explanatory",
          value: "Estudios de alcance Explicativo"
        }
      ],
      typeList: [
        {
          id: 1,
          type: "quantitive",
          value: "Estudio cuantitativo"
        },
        {
          id: 2,
          type: "qualitative",
          value: "Estudio cualitativo"
        }
      ],
      levelList: [
        { id: 1, type: "nonExperimental", value: "No experimental" },
        { id: 2, type: "experimental", value: "Experimental" }
      ],
      selectedDesign: null,
      selectedType: null,
      selectedLevel: null,
      imgDesignSrc:
        "http://normasapa.net/wp-content/uploads/2016/11/diseno-investigacion.gif"
    };
  },
  methods: {
    saveIntoStoreAndDB() {
      let payload = {
        design: this.selectedDesign,
        type: this.selectedType,
        level: this.selectedLevel
      };
      this.$store.dispatch("research/updateTypeAndDesign", payload);
      let indexes1 = this.getResearchIndex("typeOfResearch");
      let indexes2 = this.getResearchIndex("levelOfResearch");
      let payload1 = {
        level1Index: indexes1[0],
        level2Index: indexes1[1],
        values: [Paragraph(this.selectedType)]
      };
      let payload2 = {
        level1Index: indexes2[0],
        level2Index: indexes2[1],
        values: [Paragraph(this.selectedLevel)]
      };

      this.$store.dispatch("research/updateResearchDynamically", payload1);
      this.$store.dispatch("research/updateResearchDynamically", payload2);
    },
    getDataFromStore() {
      this.selectedDesign = this.characteristics.design;
      this.selectedType = this.characteristics.type;
      this.selectedLevel = this.characteristics.level;
      console.log("el diseno seleccionado fue: ", this.selectedDesign);
    }
  },
  computed: {
    ...mapState("research", ["characteristics"]),
    ...mapGetters("research", ["getResearchIndex"])
  },
  beforeMount() {
    this.getDataFromStore();
  }
};
</script>

<style lang="scss" scoped>
</style>