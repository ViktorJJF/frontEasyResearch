import Vue from 'vue';
import { v4 as uuidv4 } from 'uuid';

const uuid = {
  install: (Vue) => {
    Vue.prototype.$uuid = () => {
      return uuidv4();
    };
  },
};

Vue.use(uuid);
