<template>
  <div>
    <v-app>
      <span class="bg_image"></span>
      <Header v-if="$store.getters['isLogin']" />
      <Menu v-if="$store.getters['isLogin']" />
      <Content />
    </v-app>
  </div>
</template>

<script lang="ts">
// กรณีใช้ TypeScript จะต้องติดตั้ง vue-property-decorator
import { Vue, Component } from "vue-property-decorator";
import Header from "./components/core/Header.vue";
import Menu from "./components/core/Menu.vue";
import Content from "./components/core/Content.vue";

@Component({ components: { Header, Menu, Content } })
export default class App extends Vue {
  private isLogin = true;

  mounted() {
    this.$store.dispatch({ type: "restoreLogin" });
  }
}
</script>

<style scoped>
.bg_image {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("assets/background.jpg") no-repeat center center;
  background-size: cover;
  transform: scale(1.1);
}
</style>
