<template>
  <v-card v-ripple class="mx-auto" max-width="344" outlined>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{ title }}</v-list-item-title>
        <v-list-item-subtitle class="title">{{
          subtitle
        }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" :color="avatar_bg">
        <v-icon color="white">{{ avatar_ic }}</v-icon>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class StockCard extends Vue {
  @Prop() private title: string | null | undefined;
  @Prop() private subtitle: string | null | undefined;
  @Prop() private avatar_bg: string | null | undefined;
  @Prop() private avatar_ic: string | null | undefined;
}
</script>

<style></style>
