<template>
  <loading v-if="!$store.state.authUser"></loading>
  <div v-else>
    <v-btn block color="blue white--text" class="mb-2 elevation-0" @click="handleLinkWithGoogle()">Sign up with Google</v-btn>
    <v-card class="mt-4">
      <v-card-text class="pb-0">
        <p style="font-weight:bold">Or sign up with email</p>
        <v-flex><v-text-field type="email" label="Email" v-model="email"></v-text-field></v-flex>
        <v-flex><v-text-field type="password" label="Password" v-model="password"></v-text-field></v-flex>
      </v-card-text>
      <v-card-actions class="px-2 pb-3">
        <v-btn block @click="handleLinkWithEmail()" :disabled="(email === null || password === null) ? true : false">Sign up</v-btn>
      </v-card-actions>
    </v-card>
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
      password: null
    }),
    methods: {
      handleLinkWithGoogle () {
        var provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().currentUser.linkWithRedirect(provider)
      },
      handleLinkWithEmail () {
        var credential = firebase.auth.EmailAuthProvider.credential(this.email, this.password)
        firebase.auth().currentUser.linkWithCredential(credential)
          .then(user => {
            this.$store.commit('setAuthUser', {
              email: user.email,
              id: user.uid
            })
            this.$router.replace('/')
            this.$store.commit('setNotification', 'Successfully registered! Enjoy Task.al')
          })
          .catch((error) => {
            this.$store.commit('setNotification', error.message)
          })
      }
    },
    created () {
      this.$store.commit('setToolbarTitle', 'Create a Free Account')
      // After the user has signed in to provider and they are redirected back to us
      firebase.auth().getRedirectResult()
        .then((result) => {
          if (result.credential) {
            this.$store.commit('setAuthUser', {
              email: result.user.email,
              id: result.user.uid
            })
            this.$router.replace('/')
            this.$store.commit('setNotification', 'Successfully registered! Enjoy Task.al')
          }
        })
        .catch((error) => {
          this.$store.commit('setNotification', error.message)
        })
    }
  }
</script>
