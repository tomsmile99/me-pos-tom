<template lang="html">
  <v-navigation-drawer
    app
    permanent
    absolute
    dark
    src="@/assets/background_menu.jpg"
  >
    <router-link to="/" exact>
      <v-img src="@/assets/vue_display.jpg" alt="" width="100%" />
    </router-link>

    <v-list shaped>
      <v-subheader>MENUS</v-subheader>
      <v-list-item-group v-model="selectedMenu" mandatory color="primary">
        <v-list-item
          class="tile"
          v-for="([icon, text, route], i) in menus"
          :key="i"
          link
          @click="onClickMenu(route)"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
// กรณีใช้ TypeScript จะต้องติดตั้ง vue-property-decorator
import { Vue, Component, Watch } from "vue-property-decorator";
@Component({})
export default class Menu extends Vue {
  // https://cdn.materialdesignicons.com/1.1.70/
  private menus = [
    ["mdi-apps-box", "Stock", "/stock"],
    ["mdi-cart-outline", "Shop", "/shop"],
    ["mdi-chart-areaspline", "Report", "/report"],
    ["mdi-content-paste", "Transaction", "/transaction"],
  ];

  private selectedMenu = 0;
  mounted() {
    this.selectedMenu = this.menus.findIndex(
      (menu) => menu[2] == this.$route.path
    );
  }

  @Watch("$route")
  onRouteChanged(to: any, from: any) {
    this.selectedMenu = this.menus.findIndex((menu) => menu[2] == to.path);
  }

  onClickMenu(link: string) {
    this.$router.push(link).catch((err) => {});
  }
}
</script>

<style></style>
