<template>
  <research-element-card :title="completeObject.tag">
    <v-container slot="body">
      {{completeObject}}
      <v-layout row>
        <v-flex xs12 sm1>
          <strong>#</strong>
        </v-flex>
        <v-flex xs12 sm5>
          <strong>Actividad</strong>
        </v-flex>
        <v-flex xs12 sm3>
          <strong>Fecha de inicio</strong>
        </v-flex>
        <v-flex xs12 sm3>
          <strong>Fecha de finalización</strong>
        </v-flex>
      </v-layout>
      <activity-component
        v-for="activity in activities"
        :key="activity.id"
        :activityName="activity.name"
        :startingDate="activity.startingDate"
        :finishingDate="activity.finishingDate"
        :activityId="activity.id"
        @onUpdate="saveIntoStore"
      ></activity-component>
    </v-container>
    <v-container slot="help">esta ayudita te sera util para la justificacion</v-container>
  </research-element-card>
</template>

<script>
import ActivityComponent from "../components/ActivityComponent";
import { generateObjectId } from "../../../tools/objectIdGenerator";
import { customCopyObject } from "../../../tools/customCopyObject";
import { mapGetters } from "vuex";
export default {
  name: "schedule",
  components: {
    ActivityComponent
  },
  props: ["index"],
  data() {
    return {
      completeObject: {},
      activities: []
    };
  },
  created() {
    console.log("schedule creado");
    this.getSchedule();
    console.log("el horario es:", this.activities);
    console.log("id 1:", generateObjectId());
    console.log("id 1:", generateObjectId());
    console.log("id 1:", generateObjectId());
    console.log("id 1:", generateObjectId());
    console.log("id 1:", generateObjectId());
  },
  methods: {
    getSchedule() {
      let index = this.getResearchIndex("schedule");
      this.completeObject = this.$store.getters["research/getResearchData"](
        index
      );
      console.log("las actividades son: ", this.completeObject);
      this.activities = this.completeObject.values[0].scheduleBody;
    },

    saveIntoStore(activityId, startingDate, finishingDate) {
      this.completeObject.values[0].scheduleBody[
        activityId
      ].startingDate = startingDate;
      this.completeObject.values[0].scheduleBody[
        activityId
      ].finishingDate = finishingDate;
      let payload = {
        level1Index: this.index.level1Index,
        level2Index: this.index.level2Index,
        values: customCopyObject(this.completeObject.values)
      };
      this.$store.dispatch("research/updateResearchDynamically", payload);
    }
  },
  computed: {
    hasLevel3() {
      return this.completeObject.level3.length;
    },
    ...mapGetters("research", ["getResearchIndex"])
  }
};
</script>

<style scoped>
</style>
