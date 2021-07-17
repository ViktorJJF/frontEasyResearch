<template>
  <v-dialog v-model="dialog" width="700">
    <template v-slot:activator="{ on:dialog }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on:tooltip }">
          <v-btn color="tertiary" v-on="{...tooltip,...dialog}" outlined small dark>
            <v-icon>{{btnIcon}}</v-icon>
          </v-btn>
        </template>
        <span>{{tooltipText}}</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-toolbar color="tertiary" dark>
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <!-- body -->
        <slot name="modalBody"></slot>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["tooltipText", "btnIcon", "title", "status"],
  data() {
    return {
      dialog: this.status
    };
  },
  methods: {
    closeDialog() {
      console.log("cerrando tabla");
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>