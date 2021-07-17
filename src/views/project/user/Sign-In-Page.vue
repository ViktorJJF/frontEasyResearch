<template>
  <loading v-if="!$store.state.authUser"></loading>
  <div v-else>
    <v-btn block color="blue white--text" class="mb-2 elevation-0" @click="handleSignInWithGoogle()">Sign in with Google</v-btn>
    <v-card class="mt-4">
      <v-card-text class="pb-0">
        <p style="font-weight:bold">Or sign in with email</p>
        <v-flex><v-text-field type="email" label="Email" v-model="email"></v-text-field></v-flex>
        <v-flex><v-text-field type="password" label="Password" v-model="password"></v-text-field></v-flex>
      </v-card-text>
      <v-card-actions class="px-2 pb-3">
        <v-btn block @click="handleSignInWithEmail()" :disabled="(email === null || password === null) ? true : false">Sign in</v-btn>
      </v-card-actions>
    </v-card>

    <v-btn class="mt-2" flat block color="grey" small @click.stop="forgotPasswordDialog = !forgotPasswordDialog">Forgot your password?</v-btn>
    <v-dialog v-model="forgotPasswordDialog" max-width="320px">
      <v-card>
        <v-card-title class="pb-0">
          <div class="headline">Reset your password</div>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model.trim="forgotPasswordEmail" label="Email Address" hint="Press enter to continue" @keyup.enter="handleForgotPassword()" autofocus></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
 </template>

<script>
  import firebase from 'firebase'
  
  import Loading from '@/components/util/Loading'

  export default {
    components: {
      Loading
    },
    data: () => ({
      email: null,
      password: null,
      forgotPasswordEmail: null,
      forgotPasswordDialog: false
    }),
    methods: {
      handleSignInWithGoogle () {
        var provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
      },
      handleSignInWithEmail () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            this.$store.commit('setAuthUser', {
              email: user.email,
              id: user.uid
            })
            this.$router.replace('/')
            this.$store.commit('setNotification', 'Welcome back to Task.al')
          })
          .catch((error) => {
            this.$store.commit('setNotification', error.message)
          })
      },
      handleForgotPassword () {
        firebase.auth().sendPasswordResetEmail(this.forgotPasswordEmail)
          .then(() => {
            this.forgotPasswordDialog = false
            this.forgotPasswordEmail = ''
            this.$store.commit('setNotification', 'Done. Please check your email.')
          })
          .catch(error => {
            this.$store.commit('setNotification', error.message)
          })
      }
    },
    created () {
      this.$store.commit('setToolbarTitle', 'Sign in')
      // After the user has signed in to provider and they are redirected back to us
      firebase.auth().getRedirectResult()
        .then((result) => {
          if (result.credential) {
            this.$store.commit('setAuthUser', {
              email: result.user.email,
              id: result.user.uid
            })
            this.$router.replace('/')
            this.$store.commit('setNotification', 'Welcome back to Task.al')
          }
        })
        .catch((error) => {
          this.$store.commit('setNotification', error.message)
        })
    }
  }
</script>

<style scoped>
</style>
