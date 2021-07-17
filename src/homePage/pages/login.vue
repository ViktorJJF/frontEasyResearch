<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" offset-sm3>
        <v-card>
          <v-card-title>Iniciar Sesión</v-card-title>
          <v-card-text>
            <v-container>
              <v-form>
                <v-row>
                  <v-text-field
                    name="email"
                    label="Correo"
                    id="email"
                    type="email"
                    v-model="loginForm.email"
                    required
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    @click:append="show1 = !show1"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :type="show1 ? 'text' : 'password'"
                    name="password"
                    label="Contraseña"
                    id="password"
                    v-model="loginForm.password"
                    required
                  ></v-text-field>
                </v-row>
                <v-row justify="end">
                  <v-btn dark color="tertiary" @click="submit">Ingresar</v-btn>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      show1: false,
      loginForm: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submit() {
      axios
        .post('/api/auth/login', this.loginForm)
        .then((response) => {
          console.log('datos:', response.data);
          localStorage.setItem('auth_token', response.data.token);
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.getItem('auth_token');
          // toastr["success"](response.data.message);

          this.$router.push({ name: 'Info' });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
