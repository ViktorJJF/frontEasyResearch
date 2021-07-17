<template>
  <span>
    <v-dialog v-model="askSignInDialog" max-width="360px" persistent>
      <v-card>
        <v-card-title primary-title class="pb-0">
          <div><h3 class="headline mb-0">Already a member?</h3></div>
        </v-card-title>
        <v-card-text class="pb-2">
          <v-btn block color="primary" class="mb-2" @click="$router.push('/sign-in')">Sign in</v-btn>
          <v-btn block flat color="primary" @click="createAnonymousUser()">No, continue</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data () {
      return {
        askSignInDialog: false
      }
    },
    methods: {
      createAnonymousUser () {
        firebase.auth().signInAnonymously()
          .then(() => {
            this.askSignInDialog = false
            this.$store.commit('setNotification', 'Welcome to Task.al. Remember to register later to save your data')
          })
          .catch((error) => this.$store.commit('setNotification', error.message))
      }
    },
    created () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user === null) {
          this.askSignInDialog = true
          this.$store.commit('setToolbarTitle', 'Task.al')
        }
      })
    }
  }
</script>

