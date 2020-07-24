<template lang="html">
  <v-content>
    <router-view />
  </v-content>
</template>

<script lang="ts">
// กรณีใช้ TypeScript จะต้องติดตั้ง vue-property-decorator
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Content extends Vue {}
</script>

<style></style>
