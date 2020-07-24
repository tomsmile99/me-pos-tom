<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          src="@/assets/login_header.jpg"
        >
          <v-card-title>Login</v-card-title>
        </v-img>

        <v-card-text>
          <v-form @submit.prevent="onSubmit" v-model="valid" ref="form">
            <!-- Username field -->
            <v-text-field
              v-model="account.username"
              label="Username"
              required
            />

            <!-- Password field -->
            <v-text-field
              label="Password"
              v-model="account.password"
              min="8"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              counter
              required
            />
            <v-alert v-if="isError" type="error">
              Login failed due to invalid account.
            </v-alert>
            <!-- Buttons  -->
            <v-layout justify-space-between class="mt-5">
              <v-btn text small class="gray" @click="$router.push('/register')"
                >Register</v-btn
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
            <span>{{ account }}</span>
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
export default class Login extends Vue {
  private account: Account = {
    username: "",
    password: "",
  };
  private showPassword = false;
  private valid = false;
  private isError = false;

  async onSubmit() {
    this.$store.dispatch({
      type: "doLogin",
      ...this.account,
    });
  }
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push("/stock");
    }
  }
  /*
  async onSubmit() {
    const result = await api.login(this.account);
    if (result == false) {
      this.isError = true;
      this.$refs.form.reset();
    } else {
      //this.$store.state.username = this.account.username;
      this.$store.dispatch({
        type: "doLogin",
        ...this.account,
      });
    }

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
  */
}
</script>

<style></style>
