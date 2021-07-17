<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex md12 sm12 lg4>
        <v-text-field v-model="research" label="Regular"></v-text-field>
        <p>{{research}}</p>
        <v-btn color="success" @click="list(research)">Listar Titulos</v-btn>
        <ul v-for="title in titles" :key="title.id">
          <li>{{title}}</li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      research: "",
      titles: []
    };
  },
  components: {},
  methods: {
    list(search) {
      let data = search.replace(/ /g, "+");
      let Url = "/api/webscraping/" + data;
      let titles = [];
      console.log("Se hizo web scraping a: ", Url);
      axios
        .get(Url)
        .then(response => {
          console.log(response.data);
          this.titles = response.data;
        })
        .catch(function(e) {
          console.log(e);
        });
    }
  }
};
</script>
