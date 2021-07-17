<template>
  <div>
    <v-row class="mb-3" align="center">
      <span class="title">{{title}}</span>
      <!-- Modal help -->
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on:dialog }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon class="ml-3" v-on="{ ...tooltip, ...dialog }">
                <v-icon dark>mdi-information-outline</v-icon>
              </v-btn>
            </template>
            <span>Ver sugerencias</span>
          </v-tooltip>
        </template>
        <v-card>
          <v-toolbar color="tertiary" dark>
            <v-toolbar-title>Sugerencias</v-toolbar-title>
          </v-toolbar>
          <!-- body -->
          <v-container>
            <slot name="help"></slot>
          </v-container>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">De acuerdo</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <slot name="body"></slot>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style lang="scss" scoped>
</style>