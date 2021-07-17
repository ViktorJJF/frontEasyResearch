<template>
  <v-dialog v-model="dialog" width="700">
    <template v-slot:activator="{ on }">
      <v-btn outlined small color="primary" dark v-on="on">Insertar Citas</v-btn>
    </template>
    <v-card>
      <v-toolbar color="tertiary" dark>
        <v-toolbar-title>Listado de referencias</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-simple-table dense>
          <thead>
            <tr>
              <th class="text-left">Título</th>
              <th class="text-left">Autor</th>
              <th class="text-left">Tipo de cita</th>
              <th class="text-left">Insertar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reference in references" :key="reference.id">
              <td>{{ reference.title }}</td>
              <td>{{ reference.fullAuthors }}</td>
              <td>
                <v-select
                  v-model="selectedType"
                  :items="items"
                  item-text="type"
                  item-value="typeId"
                ></v-select>
              </td>
              <td>
                <v-btn
                  @click="dialog = false;addInTextCitation(_getCitation(reference,selectedType),reference.id,selectedType);"
                  small
                  outlined
                  color="tertiary"
                >Insertar</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getCitation } from "../../tools/referenceGenerator";
export default {
  data() {
    return {
      dialog: false,
      selectedType: 1,
      items: [
        { id: 1, type: "(autor,año)", typeId: 1 },
        { id: 2, type: "autor(año)", typeId: 2 }
      ]
    };
  },
  methods: {
    _getCitation(reference, typeOfCitation) {
      return getCitation(reference, typeOfCitation);
    },
    addInTextCitation(InTextCitation, referenceId, typeOfCitation) {
      this.$emit(
        "addTextCitationEvent",
        InTextCitation,
        referenceId,
        typeOfCitation
      );
    }
  },
  computed: {
    references() {
      return this.$store.state.research.references;
    }
  },
  created() {
    // this.getReferences();
    console.log("se creo la referencia");
  }
};
</script>

<style scoped>
</style>