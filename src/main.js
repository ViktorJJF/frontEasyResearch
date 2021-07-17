import Vue from 'vue';
import '@/plugins/vuetify';
import vuetify from '@/plugins/vuetify';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

// styles
import '@/assets/scss/styles.scss';

//vee validate
import '@/plugins/vee-validate';

//i18n
import i18n from '@/plugins/i18n';

//Global Components
import '@/tools/globalComponents/globalComponents.js';

import '@/bootstrap';

Vue.config.productionTip = false;

//plugins
import '@/plugins/deepCopy';
import '@/plugins/vee-validate';
import '@/plugins/axios';
import '@/plugins/uuid';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
// import VuetifyConfirm from 'vuetify-confirm';
// Vue.use(VuetifyConfirm, {
//   vuetify,
//   buttonTrueText: 'Aceptar',
//   buttonFalseText: 'Cancelar',
//   color: 'error',
//   icon: 'mdi-alert-circle-outline',
//   title: 'Advertencia',
//   width: 350,
//   property: '$confirm',
//   buttonTrueColor: 'red lighten3',
//   // buttonFalseColor: "yellow lighten3"
// });

//html2Canva
// import VueHtml2Canvas from 'vue-html2canvas';
// Vue.use(VueHtml2Canvas);

import draggable from 'vuedraggable';
Vue.component('draggable', draggable);

//mixins
Vue.mixin({
  computed: {
    console: () => console,
  },
});
//filters
import '@/filters/formatMoney';

new Vue({
  vuetify,
  router,
  store,
  i18n,
  created() {
    if (store.getters['authModule/isTokenSet']) {
      store.dispatch('authModule/autoLogin');
    }
  },
  render: (h) => h(App),
}).$mount('#app');
