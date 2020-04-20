<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <AddPanel />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AddPanel from "@/components/AddItem.vue";

@Component({
  components: { AddPanel }
})
export default class Add extends Vue {
  id = "";
  company = {
    about: "",
    basicInfo: { ceo: "", founded: "", hq: "" }
  };
}
</script>
