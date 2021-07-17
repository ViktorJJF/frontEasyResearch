<template>
  <div>
    <v-dialog persistent v-model="dialog" max-width="500px">
      <v-card>
        <v-alert class="ma-0" outlined color="purple">
          <div class="title">Bienvenido!</div>
          <v-layout align-center wrap>
            <div>
              A partir de ahora empieza el proceso de
              <strong>desarrollo del proyecto de tesis!</strong>
            </div>
          </v-layout>
          <div>Puedes empezar con una pequeña guía</div>
          <v-divider class="my-4 info"></v-divider>
          <v-layout align-center>
            <v-spacer></v-spacer>
            <v-btn color="tertiary" outlined>Vale!</v-btn>
            <v-btn @click="dialog=false" text color="error">Ahora no</v-btn>
          </v-layout>
        </v-alert>
      </v-card>
    </v-dialog>
    <v-container style="max-width: 700px">
      <v-card color="tertiary" class="white--text">
        <v-card-title>
          <div class="headline">Resumen diario de la investigación</div>
        </v-card-title>
      </v-card>
      <v-card outlined>
        <v-container>
          <h3>
            Porcentaje de realización de la tesis:
            <v-fade-transition>
              <span>{{progress}}%</span>
            </v-fade-transition>
          </h3>

          <v-divider class="mt-3"></v-divider>

          <v-layout my-1 align-center>
            <strong class="mx-3 info--text text--darken-3">Secciones restantes: {{ remainingTasks }}</strong>

            <v-divider vertical></v-divider>

            <strong class="mx-3 black--text">Secciones completadas: {{ completedTasks }}</strong>

            <v-spacer></v-spacer>

            <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
          </v-layout>

          <v-divider class="mb-3"></v-divider>

          <v-card v-if="tasks.length > 0">
            <v-slide-y-transition class="py-0" group tag="v-list">
              <template v-for="(task, i) in tasks">
                <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

                <v-list-item :key="`${i}-${task.text}`">
                  <v-list-item-action>
                    <v-checkbox v-model="task.done" color="info darken-3">
                      <template v-slot:label>
                        <div
                          :class="task.done && 'grey--text' || 'text--primary'"
                          class="ml-3"
                          v-text="task.text"
                        ></div>
                      </template>
                    </v-checkbox>
                  </v-list-item-action>

                  <v-spacer></v-spacer>

                  <v-scroll-x-transition>
                    <v-icon v-if="task.done" color="success">mdi-check</v-icon>
                  </v-scroll-x-transition>
                </v-list-item>
              </template>
            </v-slide-y-transition>
          </v-card>
          <p v-for="(title,i) in research" :key="i">{{ title.tag }}</p>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: true,
      research: this.level1Titles,
      tasks: [],
      task: null
    };
  },
  mounted() {
    this.populate();
  },

  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.done).length;
    },
    progress() {
      return parseInt((this.completedTasks / this.tasks.length) * 100);
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
    ...mapGetters({ level1Titles: "research/level1Titles" })
  },

  methods: {
    populate() {
      this.level1Titles.forEach(chapter => {
        this.tasks.push({
          done: false,
          text: chapter.tag
        });
      });
    },
    create() {
      this.tasks.push({
        done: false,
        text: this.task
      });

      this.task = null;
    }
  }
};
</script>

<style scoped>
</style>