<template>

  <div id="user-info">

    <v-list class="pa-0">

      <v-list-tile avatar @click.stop="dialog = true" ripple>
        <v-list-tile-avatar class="pt-0">
          <img :src="avatar" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="body-1 grey--text text--darken-2 caption">{{$store.state.authUser.email}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>

    <v-divider></v-divider>

    <v-dialog v-model="dialog" max-width="420px">
      <h3 class="headline white px-4 pt-4 pb-4 text-xs-center">Settings</h3>

      <v-expansion-panel>

        <v-expansion-panel-content ripple v-model="expanded">
          <div slot="header">Account</div>
          <v-card>
            <v-card-text class="grey lighten-4">
              <user-settings></user-settings>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>

        <v-expansion-panel-content ripple>
          <div slot="header">Contact us</div>
          <v-card>
            <v-card-text class="grey lighten-4">
              <contact></contact>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>

      </v-expansion-panel>
    </v-dialog>

  </div>

</template>

<script>
  import firebase from 'firebase'
  import 'firebase/firestore'

  import UserSettings from './User-Settings'
  import Contact from '@/components/util/contact'

  export default {
    components: {
      UserSettings, Contact
    },
    props: ['authUser'],
    data () {
      return {
        dialog: false,
        expanded: true,
        avatar: ''
      }
    },
    methods: {
      logout () {
        firebase.auth().signOut()
      }
    },
    created () {
      var crypto = require('crypto')
      var emailHash = crypto.createHash('md5').update(this.$store.state.authUser.email).digest('hex')
      this.avatar = 'https://www.gravatar.com/avatar/' + emailHash + '?d=mm'
    }
  }
</script>

<style>
#user-info li a {
  flex-direction: column!important;
  height: auto!important
}
</style>
