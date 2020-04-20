<template>
  <v-app>
    <v-app-bar app color="primary primaryTypo--text" dark>
      <v-toolbar-title>Orange Pluot Web</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-if="$route.meta.authRequired"
          class="primaryTypo--text"
          text
          @click="logout"
        >
          <v-icon>mdi-logout</v-icon>Log Out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content class="grey lighten-5">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import firebase from "@/FirebaseConf";

@Component({
  name: "App"
})
export default class App extends Vue {
  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.push("/account");
      })
      .catch(err => alert(err));
  }
}
</script>
