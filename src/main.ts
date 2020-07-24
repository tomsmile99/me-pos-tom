import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { imageUrl } from "@/services/constants";
import "material-design-icons-iconfont/dist/material-design-icons.css"; // https://iconify.design/icon-sets/mdi/
import Vue2Filters from "vue2-filters";
import moment from "vue-moment";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(Vue2Filters);
Vue.use(moment); // กำหนดรูปแบบวันที่
Vue.filter("imageUrl", function(image: any) {
  return `${imageUrl}/${image}?timestamp=${Date.now()}`;
});
