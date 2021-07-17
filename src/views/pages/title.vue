<template>
  <div>
    <research-card @onSave="saveIntoStoreAndDB" title="Redactando el título">
      <div slot="body">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Inicio</v-stepper-step>

            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">Tienes un título?</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 3" step="3">Definiendo el título ya!</v-stepper-step>

            <v-divider></v-divider>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <h3>¿Tienes un título en mente?</h3>
              <section>
                <v-container>
                  <v-layout justify-center>
                    <v-flex sm12>
                      <div class="text-center">
                        <v-btn dark color="tertiary" @click="e1 +=1">Empezar!</v-btn>
                      </div>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex sm-12>
                      <blockquote
                        class="blockquote"
                      >✔️ En esta sección se te da opción de colocar el título de tu investigación, o bien seguir una serie de pasos que te permitan crear tu primer título tentativo.</blockquote>
                      <blockquote
                        class="blockquote"
                      >✔️ Recuerda que el título da información acerca del tipo de investigación, las variables a investigar, el espacio y el tiempo, por lo que la forma del título (usar sinónimos) puede cambiar conforme avances en tu investigación, pero se deben tratar de mantener iguales las partes antes mencionadas.</blockquote>
                    </v-flex>
                  </v-layout>
                </v-container>
              </section>
            </v-stepper-content>
            <v-stepper-content step="2">
              <h2>Tienes un título en mente?</h2>
              <section class="marginTop">
                <div>
                  <input
                    type="radio"
                    id="control_01"
                    name="select"
                    :value="true"
                    v-model="response"
                    checked
                  />
                  <label for="control_01">
                    <h2>Sí</h2>
                    <p>Cuento con un título de investigación y quiero redactarlo</p>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="control_02"
                    name="select"
                    :value="false"
                    v-model="response"
                  />
                  <label for="control_02">
                    <h2>No</h2>
                    <p>Cuento con un título de investigación y quiero ayuda</p>
                  </label>
                </div>
              </section>
              <v-btn outlined color="error" @click="e1 = e1-1">Atrás</v-btn>
              <v-btn outlined color="primary" @click="e1+=1">Siguiente</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-form v-if="response">
                <v-container>
                  <p>
                    <strong>Si ya tienes un título en mente escríbelo aquí</strong> (será necesario para tener claros las variables, el diseño de investigación, el espacio y el tiempo )
                  </p>
                  <v-text-field
                    v-model="title.fullTitle"
                    v-validate="'required|max:70'"
                    :counter="50"
                    label="Título propuesto"
                    name="title"
                    required
                  ></v-text-field>
                </v-container>
              </v-form>
              <v-form v-if="!response">
                <p class="headline mb-2">
                  Parece que no cuentas con un título,
                  <strong>puedes probar este método</strong>
                </p>
                <v-container fluid>
                  <v-layout row justify-space-around>
                    <v-flex sm12>
                      <h2>
                        <v-chip dark small color="tertiary">
                          Paso
                          <strong>&nbsp;1</strong>
                        </v-chip>Piense en un problema
                      </h2>
                      <v-textarea
                        outline
                        name="input-7-4"
                        label="El problema que detecté es..."
                        v-model="title.problem"
                        value
                      ></v-textarea>
                      <v-divider></v-divider>
                      <h2>
                        <v-chip dark small color="tertiary">
                          Paso
                          <strong>&nbsp;2</strong>
                        </v-chip>Resuma
                      </h2>
                      <small>
                        Resuma lo que acaba de escribir en 2 o 3 palabras (¿Qué palabra(s) resumen todo?)
                        <strong>(Esa será tu variable dependiente)</strong>
                      </small>

                      <v-text-field
                        v-model="title.dependentVariable"
                        label="El tema central del problema es..."
                        outline
                      ></v-text-field>
                      <v-divider></v-divider>
                      <h2>
                        <v-chip dark small color="tertiary">
                          Paso
                          <strong>&nbsp;3</strong>
                        </v-chip>Posible solución
                      </h2>
                      <small>
                        En 1 o 2 palabras, escriba en una posible alternativa (metodología, técnica, método, etc) que pueda solucionar el problema
                        <strong>(Esa será tu variable independiente)</strong>
                      </small>

                      <v-text-field
                        v-model="title.independentVariable"
                        label="La solución es..."
                        outline
                      ></v-text-field>
                      <h2>
                        <v-chip dark small color="tertiary">
                          Paso
                          <strong>&nbsp;4</strong>
                        </v-chip>Lugar y año
                      </h2>
                      <small>Escriba el lugar y año donde se desarrolla el problema</small>

                      <v-form>
                        <v-container grid-list-xl>
                          <v-layout row wrap>
                            <v-flex xs12 sm6>
                              <v-text-field
                                v-model="title.place"
                                label="Todo esto ocurren en..."
                                outline
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                              <v-text-field
                                v-model="title.year"
                                label="Pienso investigar durante el año 20..."
                                type="number"
                                outline
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-form>
                      <v-btn
                        color="tertiary"
                        outlined
                        @click="e6 += 1;generateTitle();"
                      >Generar Título</v-btn>
                      <v-alert
                        v-show="title.fullTitle"
                        mode="in-out"
                        origin="center center"
                        color="info"
                        class="mt-5"
                        border="top"
                        colored-border
                        elevation="2"
                      >
                        <v-text-field
                          label="El título de tu investigación puede ser"
                          v-model="title.fullTitle"
                        ></v-text-field>
                      </v-alert>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-container>
                  <h3>¿Aún no tienes claro cuál será tu título?</h3>
                  <div>
                    <p>Puedes consultar repositorios digitales de universidades o entidades relacionadas a la investigación para tener ideas acerca de tu título</p>
                    <p>
                      Puedes usar el siguiente buscador de
                      <strong>Renati SUNEDU</strong>
                    </p>
                  </div>
                  <v-layout wrap>
                    <v-flex md6 sm12 lg6>
                      <v-text-field v-model="researchToFind" label="Qué tesis quieres buscar?"></v-text-field>

                      <p>Se buscarán títulos de tesis sobre : "{{researchToFind}}"</p>
                    </v-flex>
                    <v-flex md6 sm12 lg6>
                      <p>
                        Puedes consultar la fuente original en:
                        <a
                          target="_blank"
                          href="http://renati.sunedu.gob.pe/"
                        >RENATI</a>
                      </p>
                    </v-flex>
                    <v-flex sm12 md12 lg12>
                      <v-btn
                        color="success"
                        @click="listTitlesRenati(researchToFind);showTitle=true;"
                      >Buscar Títulos de Tesis!</v-btn>
                      <v-progress-circular :size="50" color="amber" indeterminate v-if="progress"></v-progress-circular>
                      <div v-show="showTitle">
                        <ul>
                          <li v-for="(title,index) in titles" :key="index">{{title}}</li>
                        </ul>
                        <v-alert
                          mode="in-out"
                          origin="center center"
                          color="info"
                          class="mt-5"
                          border="top"
                          colored-border
                          elevation="2"
                        >
                          <v-text-field
                            label="¿Ya tienes tu título? Redáctalo aquí"
                            v-model="title.fullTitle"
                          ></v-text-field>
                        </v-alert>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
              <v-btn outlined color="error" @click="e1 = e1-1">Atrás</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>
      <div slot="contentModal">
        <h1>El título</h1>
        <ul>
          <li>Debe escribirse en forma declarativa</li>
          <li>Debe ser atractivo, explicito, sin adornos literarios ni nombres fastuosos.</li>
          <li>Debe referirse al tema principal</li>
          <li>Evitar iniciar con artículos y preposiciones</li>
        </ul>
        <v-img :src="imgDesignSrc" aspect-ratio="1.7" contain></v-img>
      </div>
    </research-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { customCopyObject } from "../../tools/customCopyObject";
import { mapState } from "vuex";
import { Paragraph } from "../../classes/Paragraph";
export default {
  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    showTitle: false,
    title: {
      problem: "",
      place: "",
      year: "",
      fullTitle: ""
    },

    imgDesignSrc: "/images/thesisHelper/thesisTitle.png",
    progress: false,
    researchToFind: "",
    titles: [],
    e1: 1,
    e6: 0,
    response: true,
    name: "",
    email: "",
    select: null,
    checkbox: null

    // dictionary: {
    //   attributes: {
    //     email: "E-mail Address"
    //     // custom attributes
    //   },
    //   custom: {
    //     title.fullTitle: {
    //       required: () => "No puede ir en blanco",
    //       max: "El título no puede contener más de 70 caractéres"
    //       // custom messages
    //     }
    //   }
    // }
  }),

  mounted() {
    this.initialData();
  },
  computed: {
    ...mapGetters("research", ["getResearchIndex"]),
    ...mapState("research", {
      titleFromStore: state =>
        state.characteristics.title ? state.characteristics.title.fullTitle : ""
    })
  },

  methods: {
    initialData() {
      if (this.titleFromStore) {
        this.title.fullTitle = customCopyObject(this.titleFromStore);
      }
    },
    submit() {
      this.$validator.validateAll();
    },
    clear() {
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$validator.reset();
    },
    listTitlesRenati(search) {
      this.progress = true;
      let data = search.replace(/ /g, "+");
      let Url = "/api/webscraping/" + data;
      let titles = [];
      console.log("Se hizo web scraping a: ", Url);
      axios
        .get(Url)
        .then(response => {
          console.log(response.data);
          this.titles = response.data;
          this.progress = false;
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    generateTitle() {
      this.title.fullTitle =
        "Este es un titulo entre " +
        this.title.independentVariable +
        " y " +
        this.title.dependentVariable;
    },
    saveIntoStoreAndDB() {
      let payload = { title: this.title };
      this.$store.dispatch("research/updateTitle", payload);
      this.updateTitleOfResearch(this.title.fullTitle);
    },
    updateTitleOfResearch(title) {
      let index = this.getResearchIndex("titleOfResearch");
      let payload = {
        level1Index: index[0],
        level2Index: index[1],
        values: [Paragraph(title)]
      };
      this.$store.dispatch("research/updateResearchDynamically", payload);
      this.updateCoverPage(title);
    },
    updateCoverPage(title) {
      let payload = {
        type: "titleOfResearch",
        value: title
      };
      this.$store.dispatch("research/updateCoverPageDynamically", payload);
    }
  }
};
</script>


<style lang="scss" scoped>
// The code is a bit of a mess at the moment! Sorry about that.
.marginTop {
  margin-top: 20px;
}
body {
  padding: 1rem;
  color: hsla(215, 5%, 50%, 1);
}
h1 {
  color: hsla(215, 5%, 10%, 1);
  margin-bottom: 2rem;
}
section {
  display: flex;
  flex-flow: row wrap;
}
section > div {
  flex: 1;
  padding: 0.5rem;
}
input[type="radio"] {
  display: none;
  &:not(:disabled) ~ label {
    cursor: pointer;
  }
  &:disabled ~ label {
    color: hsla(150, 5%, 75%, 1);
    border-color: hsla(150, 5%, 75%, 1);
    box-shadow: none;
    cursor: not-allowed;
  }
}
label {
  height: 100%;
  display: block;
  background: white;
  border: 2px solid hsla(209, 100%, 50%, 0.75);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  //margin: 1rem;
  text-align: center;
  box-shadow: 0px 3px 10px -2px hsla(150, 5%, 65%, 0.5);
  position: relative;
}
input[type="radio"]:checked + label {
  box-shadow: 0px 0px 20px hsla(209, 100%, 50%, 0.75);
}
input[type="radio"]#control_05:checked + label {
  background: red;
  border-color: red;
}
// p {
//   font-weight: 900;
// }

@media only screen and (max-width: 700px) {
  section {
    flex-direction: column;
  }
}
</style>