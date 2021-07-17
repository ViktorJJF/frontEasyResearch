<template>
  <v-row justify="center">
    <v-col cols="12" sm="6">
      <v-hover>
        <div slot-scope="{ hover }">
          <v-img
            @click="paragraphClicked"
            :src="completeSrc"
            aspect-ratio="1.7"
            contain
          ></v-img>
          <div class="text-center">
            <p>
              <b>Título:</b>
              {{ title }}
            </p>
            <p>
              <b>Fuente:</b>
              {{ takenFrom }}
            </p>
            <v-expand-transition>
              <div v-if="hover">
                <v-btn
                  small
                  outlined
                  color="error"
                  @click="onDeleteImage(index, image.idGlobalImage)"
                  >Eliminar</v-btn
                >
              </div>
            </v-expand-transition>
          </div>
        </div>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { saveIntoDb } from '../../tools/customDbFunctions';

export default {
  props: ['data', 'index'],
  data() {
    return {
      image: this.data,
    };
  },
  computed: {
    ...mapState('research', ['images']),
    completeSrc() {
      return this.images[this.getImageIndex(this.image.idGlobalImage)].path;
    },
    title() {
      return this.images[this.getImageIndex(this.image.idGlobalImage)].title;
    },
    takenFrom() {
      return this.$store.getters['research/getReference'](
        this.images[this.getImageIndex(this.image.idGlobalImage)].takenFrom,
        1,
      );
    },
  },
  methods: {
    paragraphClicked() {
      this.$emit('click', 123);
    },
    getImageIndex(id) {
      return this.images.findIndex((image) => image.id == id);
    },
    onDeleteImage(localIndex, globalId) {
      if (confirm('¿Seguro que deseas eliminar esta imagen?')) {
        let referenceId = this.images[
          this.getImageIndex(this.image.idGlobalImage)
        ].takenFrom;
        let path = this.completeSrc;
        axios
          .post('/api/images/delete', { path })
          .then((res) => {
            console.log('respuesta del servidor');
            console.log(res.data);
            this.$emit('onDeleteImage', localIndex, globalId);
            this.updateQtyReference(referenceId, -1);
            //saving into db
            let projectId = this.$route.params.projectId;
            saveIntoDb(projectId, (response) => {
              console.log(response);
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    updateQtyReference(referenceId, qty) {
      let payload = {
        referenceId,
        qty: qty,
      };
      this.$store.dispatch('research/updateQtyReferences', payload);
    },
    ImageClicked() {
      this.$emit('click', this.$refs.paragraphRef.$refs.input.selectionStart);
    },
  },
};
</script>

<style scoped>
</style>
