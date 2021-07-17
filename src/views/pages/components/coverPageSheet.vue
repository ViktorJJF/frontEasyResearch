<template>
  <v-sheet class="mb-5 a4SheetContainer mx-auto">
    <v-sheet elevation="9" :tile="false" class="mx-auto a4Sheet" height="100%" width="100%">
      <div class="content">
        <div
          @click="$emit('showOptions')"
          class="element"
          v-for="element in elements"
          :key="element.id"
          :style="element.styles"
        >{{ element.text }}</div>
      </div>
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      elements: []
    };
  },
  created() {
    this.responsiveData();
  },
  methods: {
    responsiveData() {
      console.log("la data es: ", this.data);
      this.elements = this.data;
      console.log("ahora elements es: ", this.elements);
      for (let i = 0; i < this.elements.length; i++) {
        let element = this.elements[i];
        element.styles.fontSize = element.styles.fontSize * 0.0833333333 + "vw";
      }
      console.log("los nuevos tamanos son: ", this.elements);
    }
  }
};
</script>

<style scoped>
.a4Sheet {
  /* 6 4 3 3 padding */
  padding-left: 19.0476%;
  padding-bottom: 10.101%;
  padding-top: 29.35683%; /* 6cm x cte=4.8928050 */
  padding-right: 14.2857%;
}
.content {
  border: 0.5px solid #000;
  height: 95.5%;
  font-family: "Times New Roman", Times, serif;
  /* font-size: 1.25vw !important; */
  line-height: 2.4;
  text-align: center;
  /* -moz-text-align-last: justify; */
  /* text-align-last: justify; */
  overflow-wrap: break-word;
}
.a4SheetContainer {
  width: 64%;
  height: 89vw;
}
.element:hover {
  outline: 1px #bbdefb dashed;
  background-color: #e3f2fd;
  cursor: pointer;
}
</style>