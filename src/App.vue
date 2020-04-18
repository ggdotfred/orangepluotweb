<template>
  <v-app>
    <v-app-bar app color="primary primaryTypo--text" dark>
      <v-toolbar-title>Orange Pluot Web</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn class="primaryTypo--text" text>
          <v-icon>mdi-logout</v-icon>Log Out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "App"
})
export default class App extends Vue {}
</script>
