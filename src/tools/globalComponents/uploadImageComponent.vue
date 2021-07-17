<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <div class="text-center mb-5">
          <v-btn color="primary" @click="pickFile">
            Escoge la imagen
            <v-icon right>mdi-upload</v-icon>
          </v-btn>
        </div>
        <v-img
          :src="imageUrl"
          aspect-ratio="1.7"
          contain
          v-if="editMode"
        ></v-img>
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload"
          style="display: none"
        />
        <div class="text-center" v-if="editMode">
          <div class="headline">{{ imageName }}</div>
          <v-text-field
            name="name"
            label="Título"
            v-model="title"
          ></v-text-field>
          <v-autocomplete
            :disabled="own"
            v-model="takenFrom"
            :hint="'Fuente: ' + getCitation(takenFrom)"
            :items="references"
            :return-object="true"
            item-text="title"
            label="Fuente"
          ></v-autocomplete>
          <v-checkbox
            color="primary"
            v-model="own"
            label="Elaboración propia"
          ></v-checkbox>
          <v-btn color="success" @click="submitFile()">Subir</v-btn>
          <v-btn color="error" outlined @click="resetValues()">Cancelar</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { getCitation } from '../../tools/referenceGenerator';
import { saveIntoDb } from '../../tools/customDbFunctions';

export default {
  props: ['data'],
  data() {
    return {
      file: '',
      imageName: '',
      imageUrl: '',
      title: '',
      takenFrom: '',
      editMode: false,
      own: false,
    };
  },
  methods: {
    getCitation(reference) {
      if (reference) {
        return getCitation(reference, 1);
      }
    },
    pickFile() {
      console.log('lista de refs: ', this.$refs);
      this.$refs.file.click();
    },
    submitFile() {
      let formData = new FormData();
      formData.append('image', this.file);
      axios
        .post('/api/images/store', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('SUCCESS!!');
          console.log('respuesta: ', response.data);
          //saving into store
          let newImagePath = response.data.path;
          if (this.own) {
            this.$emit('onUploadImage', newImagePath, this.title, 'OWN');
          } else {
            this.$emit(
              'onUploadImage',
              newImagePath,
              this.title,
              this.takenFrom.id,
            );
            this.updateQtyReference(this.takenFrom.id, 1);
          }
          //saving into db
          let projectId = this.$route.params.projectId;
          saveIntoDb(projectId, (response) => {
            console.log(response);
          });
          this.resetValues();
        })
        .catch((error) => {
          console.log(error);
          console.log('FAILURE!!');
        });
    },
    handleFileUpload(e) {
      this.editMode = true;
      this.file = this.$refs.file.files[0];
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf('.') <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result;
        });
      } else {
        this.imageName = '';
        this.imageUrl = '';
      }
    },
    resetValues() {
      this.imgUrl = '';
      this.imageName = '';
      this.file = '';
      this.title = '';
      this.takenFrom = '';
      this.editMode = false;
    },
    updateQtyReference(referenceId, qty) {
      let payload = {
        referenceId,
        qty: qty,
      };
      this.$store.dispatch('research/updateQtyReferences', payload);
    },
  },
  computed: {
    ...mapState('research', ['references']),
  },
};
</script>
