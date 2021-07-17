<template>
  <div>
    <v-list class="elevation-1">
      
      <v-list-tile avatar ripple @click="changeEmailDialog = !changeEmailDialog">
        <v-list-tile-avatar>
          <v-icon light>email</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Change Email</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile avatar ripple @click="changePasswordDialog = !changePasswordDialog">
        <v-list-tile-avatar>
          <v-icon light>lock</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Change Password</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile avatar ripple @click="deleteAccountDialog = !deleteAccountDialog">
        <v-list-tile-avatar>
          <v-icon light>delete</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Delete account</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile avatar @click="handleSignOut" ripple>
        <v-list-tile-avatar>
          <v-icon light>exit_to_app</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Sign out</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <v-list-tile class="pt-2" :href="`mailto:info@kondasoft.com?subject=Regarding%20Task.al%20Web%20App`">
        <v-list-tile-content>
          <v-list-tile-title>Contact us</v-list-tile-title>
          <v-list-tile-sub-title>info@kondasoft.com</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>

    <v-dialog v-model="changeEmailDialog" max-width="360px">
      <v-card>
        <v-card-title primary-title class="pb-0">
          <div><h3 class="headline mb-0">Change email</h3></div>
        </v-card-title>
        <v-card-text class="pb-2">
          <v-text-field type="email" label="New Email" v-model="changeEmailField" autofocus hint="Press enter to save" @keyup.enter="handleChangeEmail()" ></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="changePasswordDialog" max-width="360px">
      <v-card>
        <v-card-title primary-title class="pb-0">
          <div><h3 class="headline mb-0">Change password</h3></div>
        </v-card-title>
        <v-card-text class="pb-2">
          <v-text-field type="password" label="New Password" v-model="changePasswordField" autofocus hint="Press enter to save" @keyup.enter="handleChangePassword()" ></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteAccountDialog" max-width="360px">
      <v-card>
        <v-card-title primary-title class="pb-0">
          <div><h3 class="headline mb-0">Delete your account?</h3></div>
        </v-card-title>
        <v-card-text class="pb-0">
          <p>All your data will be lost forever. Are you sure to continue?</p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="red white--text" block @click="handleDeleteAccount">Confirm Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>

</template>

<script>
  import firebase from 'firebase'
  import 'firebase/firestore'

  export default {
    props: [
      'authUser'
    ],
    data () {
      return {
        changeEmailDialog: false,
        changeEmailField: null,
        changePasswordDialog: false,
        changePasswordField: null,
        deleteAccountDialog: false
      }
    },
    methods: {
      handleChangeEmail () {
        var user = firebase.auth().currentUser
        user.updateEmail(this.changeEmailField).then(() => {
          this.$store.commit('setNotification', 'Email updated successfully!')
        }).catch((error) => {
          this.$store.commit('setNotification', error.message)
        })
      },
      handleChangePassword () {
        var user = firebase.auth().currentUser
        user.updatePassword(this.changePasswordField).then(() => {
          this.$store.commit('setNotification', 'Password changed successfully!')
        }).catch((error) => {
          this.$store.commit('setNotification', error.message)
        })
      },
      handleDeleteAccount () {
        var user = firebase.auth().currentUser
        user.delete().then(() => {
          window.location.href = '/'
          this.$store.commit('setNotification', 'Account deleted successfully!')
        }).catch((error) => {
          this.$store.commit('setNotification', error.message)
        })
      },
      handleSignOut () {
        firebase.auth().signOut().then(() => {
          window.location.href = '/'
        })
      }
    },
    created () {
      this.$store.commit('setToolbarTitle', 'Settings')
    }

  }
</script>
