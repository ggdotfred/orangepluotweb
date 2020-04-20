<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" md="4" sm="5">
        <v-list class="homeList contentHeight " elevation="3" two-lines>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title py-1">
                <v-text-field
                  outlined
                  hide-details
                  dense
                  prepend-inner-icon="mdi-magnify"
                  v-model="search"
                  label="Companies"
                ></v-text-field>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn to="/add" class="secondary" text>
                <v-icon>mdi-plus</v-icon>
                new
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
          <template v-for="(item, i) in searchedList">
            <v-list-item link @click="stock = { ...item }" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ item.id }}</v-list-item-title>
                <v-list-item-subtitle v-if="item.updated"
                  >updated {{ moment(item.updated.toDate()).fromNow() }} by
                  {{ item.updatedBy }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="i + 'a'"></v-divider>
          </template>
        </v-list>
      </v-col>
      <v-col cols="12" md="8" sm="7">
        <EditPanel @cleared="stock = null" :stock="stock" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import moment from "moment";
import firebase from "@/FirebaseConf";
import EditPanel from "@/components/Edit.vue";

@Component({
  components: { EditPanel }
})
export default class Home extends Vue {
  // data
  stocks: Array<object> = [];
  stock = null;
  loading = false;
  search = "";
  // computed
  get moment() {
    return moment;
  }
  get searchedList() {
    return this.stocks.filter((stock: any) => {
      return stock.id.toLowerCase().includes(this.search.toLowerCase());
    });
  }
  // methods
  fetchStocks() {
    this.loading = true;
    firebase
      .firestore()
      .collection("stocks")
      .onSnapshot(
        querySnapshot => {
          this.stocks = [];
          querySnapshot.forEach((doc: any) => {
            const stock: object = {
              id: doc.id,
              ...doc.data()
            };
            this.stocks.push(stock);
          });
          this.loading = false;
        },
        error => {
          this.loading = false;
          alert(error.message);
        }
      );
  }

  // hooks
  created() {
    this.fetchStocks();
  }
}
</script>
<style lang="scss">
.contentHeight {
  height: calc(100vh - 120px);
}
.homeList {
  overflow-y: auto;
  .listItem {
    cursor: pointer;
    transition-duration: 0.25s;
    &:hover {
      background: #edeef3;
    }
  }
}
.editPanel {
  overflow-y: auto;
}
.editPanel::-webkit-scrollbar,
.homeList::-webkit-scrollbar {
  width: 1em;
}
.editPanel::-webkit-scrollbar-track,
.homeList::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.editPanel::-webkit-scrollbar-thumb,
.homeList::-webkit-scrollbar-thumb {
  background-color: #546e7a;
  outline: 1px solid #546e7a;
}
</style>
