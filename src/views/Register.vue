<template>
  <v-container>
    <v-row align="center" justify="center" class="pt-10">
      <v-card style="width:400px" :elevation="1">
        <v-img
          class="white--text align-end"
          height="200px"
          src="@/assets/docks.jpg"
        >
          <v-card-title>Register</v-card-title>
        </v-img>

        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
            <!-- Username field -->
            <v-text-field
              v-model="account.username"
              label="Username"
              :rules="emailRules"
              required
            />

            <!-- Password field -->
            <v-text-field
              v-model="account.password"
              label="Password"
              min="8"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              counter
              required
              @click:append="showPassword = !showPassword"
            />

            <!-- Buttons  -->
            <v-layout justify-space-between class="mt-5">
              <v-btn text small class="gray" @click="$router.go(-1)"
                >Cancel</v-btn
              >
              <v-btn
                type="submit"
                :class="{
                  'blue darken-4 white--text': valid,
                  disabled: !valid,
                }"
              >
                Confirm
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
// กรณีใช้ TypeScript จะต้องติดตั้ง vue-property-decorator
import { Vue, Component } from "vue-property-decorator";
import Account from "../types/account.types";
import api from "../services/api";

@Component
export default class Register extends Vue {
  private account: Account = {
    username: "",
    password: "",
  };
  private showPassword = false;
  private valid = false;
  // https://vuetifyjs.com/en/components/forms/
  private emailRules = [(v: any) => !!v || "E-mail is required"];

  async onSubmit() {
    await api.register(this.account);
    //debugger; //ตรวจสอบ Bug ต่างๆ
    // axios
    //   .post<AxiosResponse>(
    //     "http://localhost:8081/api/v2/register",
    //     this.account
    //   )
    //   .then((result: AxiosResponse) => {
    //     alert(JSON.stringify(result.data));
    //   })
    //   .catch((err) => {
    //     alert(JSON.stringify(err));
    //   });
  }
}
</script>

<style></style>
