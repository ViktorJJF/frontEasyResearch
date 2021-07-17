<template>
  <v-layout row align-center>
    <v-flex sm1>{{activityId}}</v-flex>
    <v-flex xs12 sm5>
      <p>{{activityName}}</p>
    </v-flex>
    <v-flex xs12 sm3>
      <v-menu
        v-model="menuStartingDate"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="computedStartingDateFormatted"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="startingDateLocal"
          @input="onUpdateDate();menuStartingDate = false;"
        ></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs12 sm3>
      <v-menu
        v-model="menuFinishingDate"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="computedFinishingDateFormatted"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="finishingDateLocal"
          @input="onUpdateDate();menuFinishingDate = false;"
        ></v-date-picker>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["activityName", "activityId", "startingDate", "finishingDate"],
  data() {
    return {
      menuStartingDate: false,
      menuFinishingDate: false,
      startingDateLocal: this.startingDate,
      finishingDateLocal: this.finishingDate
    };
  },
  computed: {
    computedStartingDateFormatted() {
      return this.formatDate(this.startingDateLocal);
    },
    computedFinishingDateFormatted() {
      return this.formatDate(this.finishingDate);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    onUpdateDate() {
      this.$emit(
        "onUpdate",
        this.activityId,
        this.startingDateLocal,
        this.finishingDateLocal
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>