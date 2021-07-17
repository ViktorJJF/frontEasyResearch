<template>
  <div>
    <v-card>
      <v-card-text>
        <p>You are using Task.al without an account. You may continue using our app in this way if you like, but we strongly recommend you to register and permanently save your tasks. <br> Already have an account? Please sign in.</p>
        <v-btn block class="mt-2 mb-2 elevation-0" key="sign-up" to="/sign-up">Register for Free!</v-btn>
        <v-btn block class="mb-1 elevation-0" key="sign-in" to="/sign-in">Already have an account? Sign in</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
    }),
    methods: {
    },
    created () {
      this.$store.commit('setToolbarTitle', 'Guest mode')
    }
  }
</script>

<style scoped>
</style>
