<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title>Regístrate</v-card-title>

          <v-card-text>
            <v-container>
              <v-form>
                <v-layout row>
                  <v-text-field
                    label="Nombres"
                    type="text"
                    v-model="registerForm.first_name"
                    required
                  ></v-text-field>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    label="Apellidos"
                    type="text"
                    v-model="registerForm.last_name"
                    required
                  ></v-text-field>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    label="Correo"
                    type="email"
                    v-model="registerForm.email"
                    required
                  ></v-text-field>
                </v-layout>

                <v-layout row>
                  <v-text-field
                    @click:append="show1 = !show1"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :type="show1 ? 'text' : 'password'"
                    label="Contraseña"
                    v-model="registerForm.password"
                    required
                  ></v-text-field>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    @click:append="show1 = !show1"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :type="show1 ? 'text' : 'password'"
                    label="Confirmación de Contraseña"
                    v-model="registerForm.password_confirmation"
                    :rules="[comparePasswords]"
                    required
                  ></v-text-field>
                </v-layout>

                <v-row justify="end">
                  <v-btn dark color="tertiary" @click="submit"
                    >Completar Registro</v-btn
                  >
                </v-row>
                <v-row justify="end">
                  <span>
                    Ya tienes cuenta?
                    <router-link to="/login" class="text-info m-l-5">
                      <b>Ingresa</b>
                    </router-link>
                  </span>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar :timeout="3000" v-model="snackbar">
      {{ text }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      show1: false,
      snackbar: false,
      text: '',
      registerForm: {
        email: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
      },
    };
  },
  computed: {
    comparePasswords() {
      return this.registerForm.password !==
        this.registerForm.password_confirmation
        ? 'Las contraseñas no coinciden'
        : '';
    },
  },
  mounted() {},
  methods: {
    submit() {
      axios
        .post('/api/auth/register', this.registerForm)
        .then(() => {
          this.text = 'Registro completado exitosamente';
          this.snackbar = true;
          this.$router.push('/login');
        })
        .catch((error) => {
          console.log('error: ', error);
          this.text = 'Algo salio mal';
          this.snackbar = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
