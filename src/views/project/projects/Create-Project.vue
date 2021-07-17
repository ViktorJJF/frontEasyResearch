<template>
  <span>
    <v-list-item @click.stop="dialog = !dialog" ripple>
      <v-list-item-action>
        <v-icon light>mdi-plus-circle-outline</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Crear nuevo proyecto</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-dialog v-model="dialog" max-width="360px">
      <v-card>
        <v-card-title primary-title class="pb-0">
          <div>
            <h3 class="headline mb-0">
              Crear un nuevo proyecto de investigación
            </h3>
          </div>
        </v-card-title>
        <v-card-text class="pb-2">
          <v-text-field
            v-model.trim="projectTitle"
            ref="refCreateProject"
            label="Dale un nombre al proyecto"
            autofocus
          ></v-text-field>
          <v-select
            v-model="selectedType"
            :items="types"
            item-text="name"
            item-value="id"
            label="Tipo de investigación"
          ></v-select>
          <v-select
            v-model="selectedStydyLevel"
            :items="studyLevel"
            item-text="name"
            item-value="id"
            label="Grado de investigación"
          ></v-select>
          <v-btn
            dark
            block
            color="tertiary"
            class="mb-2"
            @click="createProject()"
            >Crear proyecto</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { generateObjectId } from '../../../tools/objectIdGenerator';
export default {
  data() {
    return {
      studyLevel: [],
      types: [],
      dialog: false,
      projectTitle: 'Proyecto 01',
      selectedType: null,
      selectedStydyLevel: null,
      errorCreateProject: [],
    };
  },
  mounted() {
    this.initialData();
  },
  methods: {
    initialData() {
      axios
        .get('/api/levels')
        .then((res) => {
          if (res.data.ok) {
            this.studyLevel = res.data.payload;
          }
        })
        .catch((err) => {
          console.error(err);
        });
      axios
        .get('/api/types')
        .then((res) => {
          if (res.data.ok) {
            this.types = res.data.payload;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    createProject() {
      let payload = {
        projectId: generateObjectId(),
        title: this.projectTitle,
        type: this.selectedType,
        studyLevel: this.selectedStydyLevel,
        lastAccessedTime: Date.now(),
        configStatus: false,
        dedicatedTime: 0,
      };
      axios
        .post('/api/projects', payload)
        .then((response) => {
          console.log(response);
          let last_insert_id = response.data.last_insert_id;
          let newPayload = { ...payload, id: last_insert_id };
          this.$store.dispatch('project/addProject', newPayload);
          this.projectTitle = '';
          this.dialog = false;
          this.selectedType = null;
          this.selectedStydyLevel = null;
          this.$router.push({
            name: 'Project',
            params: {
              projectId: payload.projectId,
            },
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState('project', ['projects']),
  },
};
</script>
