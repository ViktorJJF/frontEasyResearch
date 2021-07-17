<template>
  <research-card title="Carátula">
    <div slot="body">
      <cover-page-sheet
        @showOptions="showOptions"
        v-if="coverPagePreview.length>0"
        :data="coverPagePreview"
      ></cover-page-sheet>
    </div>
  </research-card>
</template>

<script>
import { generateObjectId } from "./../../../tools/objectIdGenerator";
import { customCopyObject } from "./../../../tools/customCopyObject";
import coverPageSheet from "../components/coverPageSheet";
import {
  initializeValues,
  initializeTables,
  initializeCharacteristics,
  initializeAnnexes
} from "./../../../tools/initialValues";
import { generateCoverPageTemplate } from "../../../tools/CoverPageGenerator";
export default {
  components: {
    coverPageSheet
  },
  data() {
    return {
      link: { icon: "dashboard", text: "Finalizar", route: "/dashboard" },
      coverPagePreview: [],
      anotherData: null
    };
  },
  mounted() {
    let template = customCopyObject(
      this.$store.state.research.coverPage.template
    );
    let data = customCopyObject(
      this.$store.state.research.coverPage.basicInformation
    );

    let payload = {
      coverPageTemplate: template,
      basicInformation: data
    };
    generateCoverPageTemplate(generatedCoverPage => {
      this.loadCoverPageTemplate(generatedCoverPage);
      console.log("se genero la caratula con: ", generatedCoverPage);
    }, payload);
  },
  methods: {
    loadCoverPageTemplate(generatedCoverPage) {
      this.coverPagePreview = generatedCoverPage;
    },
    showOptions() {
      console.log("mostrando opciones");
    }
  }
};
</script>

<style scoped>
</style>