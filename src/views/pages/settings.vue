<template>
  <research-card title="Ajustes de documento">
    <v-container slot="body">
      <v-row>
        <v-col cols="12">
          <span>Normas aplicadas</span>
          <v-text-field outlined dense hide-details v-model="settings.format" disabled></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <span>Tipo de numeración de los títulos nivel 1</span>
          <v-select
            outlined
            dense
            hide-details
            :items="numerations"
            v-model="settings.level1Settings.numeration"
            placeholder="Selecciona el tipo de numeración"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <span>Mayúsculas de los títulos nivel 1</span>
          <v-select
            outlined
            dense
            hide-details
            :items="uppers"
            v-model="settings.level1Settings.uppers"
            placeholder="Selecciona el tipo de numeración"
          ></v-select>
        </v-col>
        <v-divider></v-divider>
        <v-col cols="12" sm="12">
          <span>Márgenes por defecto</span>
        </v-col>
        <v-col cols="12" sm="3">
          <span>Izquierda</span>
          <v-select
            outlined
            dense
            hide-details
            :items="uppers"
            v-model="settings.level1Settings.uppers"
            placeholder="Selecciona el tipo de numeración"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <span>Derecha</span>
          <v-select
            outlined
            dense
            hide-details
            :items="uppers"
            v-model="settings.level1Settings.uppers"
            placeholder="Selecciona el tipo de numeración"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <span>Arriba</span>
          <v-select
            outlined
            dense
            hide-details
            :items="uppers"
            v-model="settings.level1Settings.uppers"
            placeholder="Selecciona el tipo de numeración"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <span>Abajo</span>
          <v-select
            outlined
            dense
            hide-details
            :items="uppers"
            v-model="settings.level1Settings.uppers"
            placeholder="Selecciona el tipo de numeración"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12">
          <span>Márgenes de inicio de capítulo</span>
        </v-col>
        <v-col cols="12" sm="3">
          <span>Izquierda</span>
          <v-select
            outlined
            dense
            hide-details
            :items="uppers"
            v-model="settings.level1Settings.uppers"
            placeholder="Selecciona el tipo de numeración"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <span>Derecha</span>
          <v-select
            outlined
            dense
            hide-details
            :items="uppers"
            v-model="settings.level1Settings.uppers"
            placeholder="Selecciona el tipo de numeración"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <span>Arriba</span>
          <v-select
            outlined
            dense
            hide-details
            :items="uppers"
            v-model="settings.level1Settings.uppers"
            placeholder="Selecciona el tipo de numeración"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <span>Abajo</span>
          <v-select
            outlined
            dense
            hide-details
            :items="uppers"
            v-model="settings.level1Settings.uppers"
            placeholder="Selecciona el tipo de numeración"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <span>Tipo de letra</span>
          <v-select
            outlined
            dense
            hide-details
            :items="uppers"
            v-model="settings.level1Settings.uppers"
            placeholder="Selecciona el tipo de letra"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <span>Tamaño de letra</span>
          <v-select
            outlined
            dense
            hide-details
            :items="uppers"
            v-model="settings.level1Settings.uppers"
            placeholder="Selecciona el tamaño de letra"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <span>Sangría</span>
          <v-select
            outlined
            dense
            hide-details
            :items="uppers"
            v-model="settings.level1Settings.uppers"
            placeholder="Selecciona la sangría de letra"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <span>¿Aplicar sangría al inicio de cada párrafo?</span>
          <v-switch color="primary" v-model="indentation" :label="indentation?'Sí':'No'"></v-switch>
        </v-col>
        <v-col cols="12" sm="3">
          <span>Interlineado</span>
          <v-select
            outlined
            dense
            hide-details
            :items="uppers"
            v-model="settings.level1Settings.uppers"
            placeholder="Selecciona el interlineado de letra"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </research-card>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        format: "APA",
        level1Settings: {
          numeration: "",
          uppers: null
        }
      },
      numerations: ["Decimal", "Romanos"],
      uppers: [{ name: "Todo", value: 1 }, { name: "Romanos", value: 2 }],
      indentation: true
    };
  }
};
</script>

<style lang="scss" scoped>
</style>