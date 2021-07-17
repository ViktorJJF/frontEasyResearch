<template>
  <v-container>
    <v-card color="tertiary" class="white--text">
      <v-card-title primary-title>
        <div>
          <div class="headline">Referencias Bibliográficas</div>
        </div>
        <v-spacer></v-spacer>
        <v-dialog persistent v-model="dialog" max-width>
          <template v-slot:activator="{ on }">
            <v-btn dark outlined color="white" class="mb-2" v-on="on">Nueva Referencia</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-select label="Tipo" :items="researchTypes" v-model="editedItem.type"></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.title" label="Título"></v-text-field>
                  </v-flex>
                  <v-text-field v-model="editedItem.fullAuthors" disabled label="Autor"></v-text-field>
                  <v-dialog persistent v-model="dialogAuthor" width="500">
                    <template v-slot:activator="{ on }">
                      <v-btn outlined color="primary" dark v-on="on" @click="loadAuthors">Editar</v-btn>
                    </template>

                    <v-card>
                      <v-card-title
                        class="tertiary white--text"
                        primary-title
                      >Editar Datos del Autor</v-card-title>
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                              <v-text-field v-model="newAuthor.names" label="Nombres"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                              <v-text-field
                                @keyup.enter="addAuthor"
                                v-model="newAuthor.lastname"
                                label="Apellidos"
                              ></v-text-field>
                            </v-flex>
                            <v-layout wrap row>
                              <v-flex xs8 sm8 md8>
                                <v-card style="height:100%;" outlined pa-3>
                                  <v-list>
                                    <v-list-item
                                      v-for="(author,index) in authors"
                                      :key="author.names"
                                      @click="selectAuthor(index);"
                                      :class="{active:index===selectedAuthor}"
                                    >
                                      <v-list-item-content>
                                        <v-list-item-title>{{author.names+" "+author.lastname}}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-list>
                                </v-card>
                              </v-flex>
                              <v-flex xs4 sm4 md4>
                                <v-layout justify-center column fill-height>
                                  <div class="mb-1">
                                    <v-btn
                                      block
                                      small
                                      dark
                                      color="tertiary"
                                      @click="addAuthor"
                                    >Agregar</v-btn>
                                  </div>
                                  <div class="mb-1">
                                    <v-btn block small dark color="tertiary" @click="upAuthor">
                                      <v-icon>mdi-arrow-up</v-icon>Arriba
                                    </v-btn>
                                  </div>
                                  <div class="mb-1">
                                    <v-btn block small dark color="tertiary" @click="downAuthor">
                                      <v-icon>mdi-arrow-down</v-icon>Abajo
                                    </v-btn>
                                  </div>
                                  <v-btn
                                    dark
                                    small
                                    color="error"
                                    @click="deleteAuthor(selectedAuthor)"
                                  >Eliminar</v-btn>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-layout>
                        </v-container>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark color="success" @click="saveAuthors">Aceptar</v-btn>
                        <v-btn dark outlined color="error" @click="dialogAuthor = false;">Cancelar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-flex xs12 sm12 md12>
                    <v-text-field type="number" v-model="editedItem.year" label="Año"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="success" @click="addReference();storeReferences();">Guardar</v-btn>
              <v-btn dark outlined color="error" @click="close">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
    </v-card>
    <v-data-table
      hide-default-footer
      :headers="headers"
      :items="references"
      class="elevation-1 my-awesome-table"
    >
      <template v-slot:item.action="{ item }">
        <v-btn color="success" @click="editItem(item);selectedAuthor=null" icon>
          <v-icon>mdi-table-edit</v-icon>
        </v-btn>
        <v-btn color="error" @click="deleteItem(item)" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" type="error" icon="warning">Aún no cuentas con referencias</v-alert>
      </template>
    </v-data-table>
    <v-btn class="mt-5" color="success" @click="storeIntoDatabase">Guardar Cambios</v-btn>
    <label class="text-reader">
      <input type="file" @change="loadTextFromFile" />
    </label>
    <v-file-input label="Endnote" @change="loadTextFromFile($event)"></v-file-input>
    <v-btn outlined color="primary" @click="authMendeley">Autenticacion Mendeley</v-btn>
    <!-- <h3>Títulos de libros</h3>
    <v-text-field v-model="toSearch"/>
    <v-btn color="success" @click="googleBooksApi(toSearch)">Success</v-btn>
    <v-layout row wrap v-for="(book,index) in books" :key="index">
      <v-flex md6>
        <div>{{ book.volumeInfo.title }}</div>
      </v-flex>
      <v-flex md6>
        <div v-for="(author,i) in book.volumeInfo.authors" :key="i">{{ author }},</div>
      </v-flex>
    </v-layout>-->
  </v-container>
</template>

<script>
import { generateObjectId } from "../../tools/objectIdGenerator";
import { move } from "../../tools/moveArrayElements";
import { generateReference } from "../../tools/referenceGenerator";
export default {
  data() {
    return {
      index: 0,
      toSearch: "",
      books: [],
      dialog: false,
      selectedAuthor: null,
      dialogAuthor: false,
      newAuthor: {
        names: "",
        lastname: ""
      },
      authors: [],
      researchTypes: ["Libro", "Tesis", "Revista"],
      headers: [
        {
          text: "¿Citado?",
          align: "center",
          sortable: true,
          value: "qty"
        },
        {
          text: "Tipo",
          align: "center",
          sortable: true,
          value: "type"
        },
        { text: "Título", sortable: true, align: "center", value: "title" },
        {
          text: "Autor(es)",
          align: "center",
          sortable: false,
          value: "fullAuthors",
          width: "20%"
        },
        { text: "Año", sortable: true, align: "center", value: "year" },
        { text: "Acciones", value: "action", sortable: false, align: "center" }
      ],
      references: [],
      editedIndex: -1,
      editedItem: {
        id: "abc",
        type: "",
        title: "",
        authors: [],
        fullAuthors: "",
        formated: "",
        year: 2000,
        qty: 0
      },
      defaultItem: {
        id: "abc",
        type: "",
        title: "",
        authors: [],
        fullAuthors: "",
        formated: "",
        year: 2000,
        qty: 0
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Referencia" : "Editar Referencia";
    },
    indexRow() {
      return this.index++;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.getReferences();
  },
  filters: {
    indexRow: function(value) {
      this.index += 1;
      if (this.index < 5) {
        console.log("se updateara index: ", this.index);
        return this.index;
      }
    }
  },
  methods: {
    authMendeley() {
      let client_id = "7291";
      let redirect_uri = encodeURIComponent(
        "http://easyresearch2.test/admin/dashboard/types"
      );
      let response_type = "code";
      let scope = "all";
      let state = "213653957730.97845";
      window.location.href = `https://api.mendeley.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}`;
      // axios
      //   .get(
      //     `https://api.mendeley.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}`
      //   )
      //   .then(res => {
      //     console.log(res);
      //   });
    },
    loadTextFromFile(ev) {
      let text = "";
      let titleTagIndex = 0;
      let authorTagIndex = 0;
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        text = e.target.result;
        titleTagIndex = text.indexOf("%T");
        authorTagIndex = text.indexOf("%A");
        console.log(text);
        console.log(text.substring(titleTagIndex + 3, authorTagIndex - 1));
      };
      reader.readAsText(file);
    },
    storeIntoDatabase() {
      axios
        .post("/api/project/thesis-research/update", {
          projectId: this.$route.params.projectId,
          references: JSON.stringify(this.$store.state.research.references)
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getReferences() {
      this.references = this.$store.state.research.references;
    },
    storeReferences() {
      let payload = {
        references: this.references
      };
      this.$store.dispatch("research/updateReferences", payload);
    },
    calculateFullAuthors() {
      console.log("se reordeno al autor");
      let fullname = "";
      this.editedItem.authors.forEach((author, i) => {
        if (i > 0) {
          fullname += " ; " + author.names + " " + author.lastname;
        } else {
          fullname += author.names + " " + author.lastname;
        }
      });
      this.editedItem.fullAuthors = fullname;
    },
    selectAuthor(index) {
      console.log("autor seleccionado: ", index);
      this.selectedAuthor = index;
    },
    addAuthor() {
      this.authors.push({
        names: this.newAuthor.names,
        lastname: this.newAuthor.lastname
      });
      this.editedItem.authors.push({
        names: this.newAuthor.names,
        lastname: this.newAuthor.lastname
      });
      this.newAuthor.names = "";
      this.newAuthor.lastname = "";
      this.calculateFullAuthors();
    },
    deleteAuthor(index) {
      this.authors.splice(index, 1);
    },
    upAuthor() {
      if (this.selectedAuthor != null && this.selectedAuthor > 0) {
        move(
          this.authors,
          this.selectedAuthor,
          this.selectedAuthor - 1,
          result => {
            this.authors = result;
            this.selectedAuthor -= 1;
          }
        );
      }
    },
    downAuthor() {
      console.log("autor: ", this.selectedAuthor);
      console.log("tamaño: ", this.authors.length);
      if (
        this.selectedAuthor != null &&
        this.selectedAuthor < this.authors.length - 1
      ) {
        console.log("se cumplio este if");
        move(
          this.authors,
          this.selectedAuthor,
          this.selectedAuthor + 1,
          result => {
            this.authors = result;
            this.selectedAuthor += 1;
          }
        );
      }
    },
    saveAuthors() {
      console.log("se cargo saveAuthors");
      this.dialogAuthor = false;
      this.editedItem.authors = JSON.parse(JSON.stringify(this.authors));
      this.calculateFullAuthors();
    },
    loadAuthors() {
      this.authors = JSON.parse(JSON.stringify(this.editedItem.authors));
    },
    googleBooksApi(data) {
      let toSearch = data.replace(/ /g, "+");
      axios
        .get("/api/books", {
          params: {
            toSearch
          }
        })
        .then(response => {
          this.books = response.data.items;
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    },
    editItem(item) {
      this.authors = item.authors;
      this.editedIndex = this.references.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.references.indexOf(item);
      confirm("¿Quieres eliminar esta referencia?") &&
        this.references.splice(index, 1);
    },

    close() {
      this.authors = [];
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedItem.authors = [];
        this.editedIndex = -1;
      }, 300);
    },

    addReference() {
      generateReference(this.editedItem, result => {
        this.editedItem.formated = result.formated;
        if (this.editedIndex > -1) {
          Object.assign(this.references[this.editedIndex], this.editedItem);
        } else {
          this.editedItem.id = generateObjectId();
          this.references.push(this.editedItem);
        }
        this.close();
      });
    }
  }
};
</script>

<style scoped>
.title {
  color: #fff;
}
.active {
  background-color: #666;
  color: white;
}
.my-awesome-table {
  table-layout: fixed;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
}

.datatable-cell-wrapper {
  /* width: inherit; */
  position: relative;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>