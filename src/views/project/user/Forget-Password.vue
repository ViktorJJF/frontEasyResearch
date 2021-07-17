<template>
  <div class="pb-2 px-2">
    <v-btn flat block color="primary" small @click.stop="dialog = true">Forgot your password?</v-btn>
    <v-dialog v-model="dialog" max-width="720px">
      <v-card>
        <v-card-title class="pb-0">
          <div class="headline">Reset your password</div>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model.trim="email" label="Email Address" hint="Press enter to continue" :error-messages="errorEmail" @keyup.enter="resetPassword()" autofocus></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import 'firebase/firestore'

  export default {
    data () {
      return {
        email: null,
        errorEmail: [],
        dialog: false
      }
    },
    methods: {
      resetPassword () {
        firebase.auth().sendPasswordResetEmail(this.email)
          .then(() => {
            this.dialog = false
            this.email = ''
            this.errorEmail = []
          })
          .catch(error => {
            this.errorEmail = error.message
          })
      }
    }
  }
</script>
