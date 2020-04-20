<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" sm="6" md="5" lg="4" class="elevation-2 mx-auto white">
        <v-tabs grow class="primary" v-model="tabs">
          <v-tab>Log In</v-tab>
          <v-tab>Sign Up</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-card class="full-width" elevation="0">
              <v-card-text class="justify-center align-center">
                <v-form ref="login">
                  <v-text-field
                    :rules="[rules.required]"
                    label="User Email"
                    v-model="login.email"
                  >
                  </v-text-field>
                  <v-text-field
                    :rules="[rules.required]"
                    label="Password"
                    type="password"
                    v-model="login.password"
                  >
                  </v-text-field>
                </v-form>
                <v-card-actions>
                  <v-btn
                    @click="loginToAccount"
                    :loading="loading"
                    tile
                    large
                    class="primary primaryTypo--text"
                    >Log In</v-btn
                  >
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="full-width" elevation="0">
              <v-card-text class="justify-center align-center">
                <v-form ref="signUp">
                  <v-text-field
                    validate-on-blur
                    label="Full Name"
                    :rules="[rules.required, rules.min]"
                    v-model="signup.displayName"
                  >
                  </v-text-field>
                  <v-text-field
                    validate-on-blur
                    :rules="[rules.required, rules.email]"
                    label="Email"
                    v-model="signup.email"
                  >
                  </v-text-field>
                  <v-text-field
                    validate-on-blur
                    :rules="[rules.required, rules.password]"
                    label="Password"
                    type="password"
                    v-model="signup.password"
                  >
                  </v-text-field>
                  <v-text-field
                    validate-on-blur
                    :rules="[rules.required, rules.rePassword]"
                    label="Repeat Password"
                    type="password"
                    v-model="signup.rePassword"
                  >
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click="signUpAccount"
                  :loading="loading"
                  tile
                  large
                  class="primary primaryTypo--text"
                  >Sign Up</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import firebase from "@/FirebaseConf";

@Component
export default class Account extends Vue {
  // data
  tabs = 0;
  loading = false;
  login = {
    email: "",
    password: ""
  };
  signup = {
    displayName: "",
    email: "",
    password: "",
    rePassword: ""
  };
  // eslint-disable-next-line
  re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  rules = {
    required: (v: string) => !!v || "Required",
    min: (v: string) => v.length >= 5 || "Minimum 5 characters required",
    email: (v: string) =>
      this.re.test(v.toLowerCase()) || "Email must be valid",
    password: (v: string) => v.length >= 8 || "Minimum 8 characters required",
    rePassword: (v: string) =>
      v === this.signup.password || "Passwords must match"
  };
  auth = firebase.auth();

  //   methods
  async signUpAccount() {
    const valid = (this.$refs.signUp as any).validate();
    if (valid) {
      this.loading = true;
      const { displayName, email, password } = this.signup;
      try {
        const resp = await this.auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await resp.user?.updateProfile({ displayName });
        this.loading = false;
        this.$router.push("/");
      } catch (error) {
        this.loading = false;
        alert(error.message);
      }
    }
  }
  loginToAccount() {
    const valid = (this.$refs.login as any).validate();
    if (valid) {
      this.loading = true;
      const { email, password } = this.login;
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then(
          () => this.$router.push("/"),
          error => alert(error.message)
        )
        .catch(err => alert(err.message))
        .finally(() => (this.loading = false));
    }
  }
}
</script>
