<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <h1 class="mb-4 display-1">!Bienvenido a tu tablero de control!</h1>
      <p class="headline text-center">
        Este es el lugar donde se reunirán todos tus proyectos de investigación.
        <br />Pero primero, necesitamos que crees uno!
      </p>
      <v-btn class="pulse" color="primary">Crear tu primer proyecto</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    console.log("se monto informacion");
  }
};
</script>

<style scoped>
.article-card {
  margin-bottom: 15px;
}
h3,
p {
  width: 100%;
}
@keyframes shadow-pulse {
  0% {
    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
  }
  100% {
    box-shadow: 0 0 0 35px rgba(0, 0, 0, 0);
  }
}

@keyframes shadow-pulse-big {
  0% {
    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: 0 0 0 70px rgba(0, 0, 0, 0);
  }
}
.pulse {
  float: left;
  margin: 40px;
  letter-spacing: 1px;
  color: #fff;
  text-align: center;
  background: rgba(30, 144, 255, 0.6);
  animation: shadow-pulse 1s infinite;
}
.pulse:hover {
  animation: none;
}
</style>