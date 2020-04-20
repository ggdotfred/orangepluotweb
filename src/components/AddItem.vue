<template>
  <v-card elevation="3" class="full-width">
    <v-card-title>
      <v-row>
        <v-col cols="8">
          <v-text-field
            dense
            outlined
            v-model="id"
            label="Company name"
          ></v-text-field>
        </v-col>
        <v-col class="text-center" cols="4">
          <v-btn @click="close" text>close</v-btn>
          <v-btn
            :loading="loading"
            :disabled="isNotEdited"
            @click="save"
            class="secondary"
            >save changes</v-btn
          >
        </v-col>
      </v-row>

      <v-list-item style="min-height:5px;">
        <v-divider></v-divider>
      </v-list-item>
    </v-card-title>
    <v-card-text>
      <v-text-field
        label="Summary"
        v-model="editStock.about"
        dense
        outlined
      ></v-text-field>
      <v-row>
        <v-col class="py-0" sm="4" cols="12">
          <v-text-field
            label="CEO"
            v-model="editStock.basicInfo.ceo"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col class="py-0" sm="4" cols="12">
          <v-text-field
            label="Year founded"
            v-model="editStock.basicInfo.founded"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col class="py-0" sm="4" cols="12">
          <v-text-field
            dense
            label="HQ"
            v-model="editStock.basicInfo.hq"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- stats -->
      <p class="title text-center mt-0">
        Stats
      </p>
      <v-row>
        <v-col class="py-0" cols="6">
          <v-text-field
            dense
            label="dividend"
            v-model="editStock.stats.dividend"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col class="py-0" cols="6">
          <v-text-field
            dense
            label="eps"
            v-model="editStock.stats.eps"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col class="py-0" cols="6">
          <v-text-field
            dense
            label="marketcap"
            v-model="editStock.stats.marketcap"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col class="py-0" cols="6">
          <v-text-field
            dense
            label="volatility"
            v-model="editStock.stats.volatility"
            outlined
          >
          </v-text-field>
        </v-col>
      </v-row>
      <!-- stats end -->

      <!-- cashflow -->
      <v-row>
        <v-col class="py-0" cols="12">
          <p class="mb-0 text-center title">cash flow</p>
        </v-col>
        <v-col v-if="editStock.cashflow.length" class="py-0" cols="12">
          <v-data-table
            dense
            :items="editStock.cashflow"
            hide-default-footer
            :headers="cashflowHeaders"
          >
            <template v-slot:item.actions="{ item, index }">
              <v-btn
                @click="deleteCashflow(index)"
                small
                icon
                text
                class="error--text"
                dark
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pb-0" cols="6" sm="4">
          <v-text-field
            outlined
            dense
            v-model="cashflow.key"
            label="Title"
          ></v-text-field>
        </v-col>
        <v-col class="pb-0" cols="6" sm="3">
          <v-text-field
            outlined
            dense
            v-model="cashflow.cashbalance"
            label="cash balance"
          ></v-text-field>
        </v-col>
        <v-col class="pb-0" cols="6" sm="3">
          <v-text-field
            outlined
            dense
            v-model="cashflow.freecashflow"
            label="free cashflow"
          ></v-text-field>
        </v-col>
        <v-col class="pb-0" cols="4" sm="2">
          <v-btn @click="submitCashflow" dark class="primary" icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <!-- cashflow end -->

      <!-- revenue -->
      <v-row>
        <v-col class="py-0" cols="12">
          <p class="mb-0 text-center title">disaggregated revenue</p>
        </v-col>
        <v-col v-if="editStock.revenue.length" class="py-0" cols="12">
          <v-data-table
            dense
            :items="editStock.revenue"
            hide-default-footer
            :headers="revenueHeaders"
          >
            <template v-slot:item.actions="{ item, index }">
              <v-btn
                @click="deleteRevenue(index)"
                small
                icon
                text
                class="error--text"
                dark
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pb-0" cols="6" sm="4">
          <v-text-field
            outlined
            dense
            v-model="revenue.key"
            label="Product"
          ></v-text-field>
        </v-col>
        <v-col class="pb-0" cols="6" sm="3">
          <v-text-field
            outlined
            dense
            v-model="revenue.amount"
            label="Amount"
          ></v-text-field>
        </v-col>
        <v-col class="pb-0" cols="6" sm="3">
          <v-text-field
            outlined
            dense
            v-model="revenue.growth"
            label="Growth"
          ></v-text-field>
        </v-col>
        <v-col class="pb-0" cols="4" sm="2">
          <v-btn @click="submitRevenue" dark class="primary" icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <!-- revenue end -->
      <!-- earnings -->
      <v-row>
        <v-col class="py-0" cols="12">
          <p class="mb-0 text-center title">Earnings</p>
        </v-col>
        <v-col v-if="editStock.earnings.length" class="py-0" cols="12">
          <v-data-table
            dense
            :items="editStock.earnings"
            hide-default-footer
            :headers="earningHeaders"
          >
            <template v-slot:item.actions="{ item, index }">
              <v-btn
                @click="deleteEarnings(index)"
                small
                icon
                text
                class="error--text"
                dark
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pb-0" cols="6" sm="4">
          <v-text-field
            outlined
            dense
            v-model="earnings.key"
            label="Title"
          ></v-text-field>
        </v-col>
        <v-col class="pb-0" cols="6" sm="3">
          <v-text-field
            outlined
            dense
            v-model="earnings.estimate"
            label="Estimate"
          ></v-text-field>
        </v-col>
        <v-col class="pb-0" cols="6" sm="3">
          <v-text-field
            outlined
            dense
            v-model="earnings.actual"
            label="Actual"
          ></v-text-field>
        </v-col>
        <v-col class="pb-0" cols="4" sm="2">
          <v-btn @click="submitEarnings" dark class="primary" icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <!-- earnings end -->
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import firebase from "@/FirebaseConf";

@Component
export default class Add extends Vue {
  get isNotEdited(): boolean {
    return JSON.stringify(this.editStock) == this.preserved;
  }
  //   data
  id = "";
  loading = false;
  cashflowHeaders = [
    { text: "title", value: "key" },
    { text: "cash balance", value: "cashbalance" },
    { text: "free cashflow", value: "freecashflow" },
    { text: "actions", value: "actions", sortable: false }
  ];
  revenueHeaders = [
    { text: "product", value: "key" },
    { text: "Amount", value: "amount" },
    { text: "Growth", value: "growth" },
    { text: "actions", value: "actions", sortable: false }
  ];
  earningHeaders = [
    { text: "title", value: "key" },
    { text: "Actual", value: "actual" },
    { text: "Estimated", value: "estimated" },
    { text: "actions", value: "actions", sortable: false }
  ];
  cashflow = { title: "", cashbalance: "", freecashflow: "" };
  revenue = { product: "", amount: "", growth: "" };
  earnings = { title: "", actual: "", estimated: "" };
  editStock = {
    about: "",
    revenue: [],
    basicInfo: { hq: "", founded: "", ceo: "" },
    cashflow: [],
    earnings: [],
    stats: { dividend: "", eps: "", marketcap: "", volatility: "" }
  };
  preserved = JSON.stringify(this.editStock);

  // methods
  close() {
    if (this.isNotEdited) {
      this.$router.push("/");
    } else {
      confirm("Changes will not be saved. Are you sure?") &&
        this.$router.push("/");
    }
  }
  save() {
    this.loading = true;
    const user = firebase.auth().currentUser?.displayName;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const final = {
      ...this.preset(this.editStock),
      updated: timestamp,
      created: timestamp,
      updatedBy: user,
      createdBy: user
    };
    firebase
      .firestore()
      .collection("stocks")
      .doc(this.id)
      .set(final)
      .then(
        () => this.$emit("cleared"),
        err => alert(err.message)
      )
      .catch(err => alert(err.message))
      .finally(() => (this.loading = false));
  }
  submitCashflow() {
    (this as any).editStock.cashflow.push(this.cashflow);
    this.cashflow = { title: "", cashbalance: "", freecashflow: "" };
  }
  submitRevenue() {
    (this as any).editStock.revenue.push(this.revenue);
    this.revenue = { product: "", amount: "", growth: "" };
  }
  submitEarnings() {
    (this as any).editStock.earnings.push(this.earnings);
    this.earnings = { title: "", actual: "", estimated: "" };
  }
  deleteCashflow(i: number) {
    this.editStock.cashflow.splice(i, 1);
  }
  deleteEarnings(i: number) {
    this.editStock.earnings.splice(i, 1);
  }
  deleteRevenue(i: number) {
    this.editStock.revenue.splice(i, 1);
  }
  reset(array: Array<object>) {
    const obj: any = {};
    array.forEach((item: any) => {
      obj[item.key] = {
        ...item
      };
      delete obj[item.key].key;
    });

    return obj;
  }
  preset(stock: any) {
    const _stock = { ...stock };
    _stock.revenue = this.reset(stock.revenue);
    _stock.cashflow = this.reset(stock.cashflow);
    _stock.earnings = this.reset(stock.earnings);
    return _stock;
  }
}
</script>
