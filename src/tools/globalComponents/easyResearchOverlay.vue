<template>
  <v-overlay color="primary" :opacity="opacity" :value="overlay">
    <div class="margin-auto spinner sphere" id="sphere">
      <div class="inner">
        <div :style="sphereStyle" class="disc"></div>
        <div :style="sphereStyle" class="disc"></div>
        <div :style="sphereStyle" class="disc"></div>
      </div>
    </div>
    <p :style="textStyle" class="message font-weight-bold text-capitalize">{{text}}</p>
  </v-overlay>
</template>

<script>
export default {
  props: ["darkMode", "text"],
  data() {
    return {
      opacity: 0,
      overlay: true,
      sphereStyle: {
        border: "0.3em dotted #00458b"
      },
      textStyle: {
        color: "#00458b"
      }
    };
  },
  mounted() {
    if (this.darkMode) {
      this.sphereStyle.border = "0.3em dotted #fff";
      this.textStyle.color = "#fff";
      this.opacity = 1;
    }
  }
};
</script>

<style scoped>
/* COLOR SPHERE */

@-webkit-keyframes sphereSpin {
  0% {
    -webkit-transform: rotateX(360deg) rotateY(0deg);
  }
  100% {
    -webkit-transform: rotateX(0deg) rotateY(360deg);
  }
}

@keyframes sphereSpin {
  0% {
    transform: rotateX(360deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(0deg) rotateY(360deg);
  }
}
.message {
  color: white;
  font-size: 18px;
}
.margin-auto {
  margin: 30% 30%;
}
.spinner.sphere {
  width: 4em;
  height: 4em;
  -webkit-transform: perspective(20em) rotateX(-24deg) rotateY(20deg)
    rotateZ(30deg);
  transform: perspective(20em) rotateX(-24deg) rotateY(20deg) rotateZ(30deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.spinner .inner {
  width: 100%;
  height: 100%;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-animation: sphereSpin 6s linear infinite;
  animation: sphereSpin 6s linear infinite;
}

.spinner.sphere .disc {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  /* border: 0.3em dotted green; */
}

@-webkit-keyframes rotateDisc2 {
  from {
    -webkit-transform: rotateX(90deg) rotateZ(0deg);
  }
  to {
    -webkit-transform: rotateX(90deg) rotateZ(360deg);
  }
}

@keyframes rotateDisc2 {
  from {
    transform: rotateX(90deg) rotateZ(0deg);
  }
  to {
    transform: rotateX(90deg) rotateZ(360deg);
  }
}

@-webkit-keyframes rotateDisc3 {
  from {
    -webkit-transform: rotateY(90deg) rotateZ(0deg);
  }
  to {
    -webkit-transform: rotateY(90deg) rotateZ(360deg);
  }
}

@keyframes rotateDisc3 {
  from {
    transform: rotateY(90deg) rotateZ(0deg);
  }
  to {
    transform: rotateY(90deg) rotateZ(360deg);
  }
}

.spinner.sphere .disc:nth-child(1) {
  -webkit-animation: rotate 12s linear infinite;
  animation: rotate 12s linear infinite;
}

.spinner.sphere .disc:nth-child(2) {
  -webkit-animation: rotateDisc2 12s linear infinite;
  animation: rotateDisc2 12s linear infinite;
}

.spinner.sphere .disc:nth-child(3) {
  -webkit-animation: rotateDisc3 12s linear infinite;
  animation: rotateDisc3 12s linear infinite;
}
</style>