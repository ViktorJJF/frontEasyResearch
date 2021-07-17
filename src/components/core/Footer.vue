<template>
  <v-footer padless color="blue darken-2">
    <v-flex text-center xs12>
      <div class="white--text ml-4">
        {{new Date().getFullYear()}}
        <strong>EasyResearch Corp.</strong>
      </div>
    </v-flex>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
