<template>
  <v-app-bar app color="#1c2835" dark>
    <v-btn v-if="isShowBackBtn" icon @click="$router.back()">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>CMPOS Workshop V{{ version }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <span>{{ $store.getters["username"] | capitalize }}</span>
    <v-btn icon @click="onClickLogOff">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  computed: {
    version() {
      return process.env.VUE_APP_VERSION;
    },
    isShowBackBtn() {
      return this.$route.matched.some(({ name }) => {
        debugger;
        const index = ["stock-create", "stock-edit"].indexOf(name!);
        return index != -1;
      });
    },
  },
})
export default class Header extends Vue {
  onClickLogOff() {
    this.$store.dispatch("doLogout");
  }
}
</script>

<style></style>
