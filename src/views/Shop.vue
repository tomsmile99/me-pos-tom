<template lang="html">
  <v-container class="success lighten-5 mt-5">
    <v-row class="mb-4" style="height: 80vh">
      <!-- Product section -->
      <v-col lg="8">
        <v-layout class="wrap" style="max-height: 80vh; overflow-y: scroll;">
          <v-flex
            v-ripple
            md3
            v-for="(item, index) in mDataArray"
            @click="pushNewOrder(item)"
            :key="index"
          >
            <v-card class="ma-2 d-flex flex-column">
              <v-img :src="item.image | imageUrl" aspect-ratio="1" height="150">
                <v-avatar
                  v-if="item.qty > 0"
                  color="primary"
                  size="36"
                  class="ma-1 elevation-2"
                >
                  <span class="white--text title">{{ item.qty }}</span>
                </v-avatar>
              </v-img>
              <div class="text-truncate px-4">{{ item.name }}</div>
              <div class="text-truncate px-4">
                D{{ item.product_id }} / ฿{{ item.price }}
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-col>

      <!-- Order section -->
      <v-col lg="4">
        <v-card class="pa-5" style="height: 100%;">
          <!-- Tax -->
          <div class="d-flex flex-row justify-space-between">
            <div>
              <b style="font-size: 20px; font-weight: 100;">Tax 7%</b>
            </div>
            <div>
              <span>
                <b style="font-size: 18px;font-weight: 100;"
                  >{{ mTaxAmt | currency("฿") }}
                </b>
              </span>
            </div>
          </div>

          <!-- Grand-total -->
          <div class="d-flex flex-row justify-space-between">
            <div>
              <b style="font-size: 20px;">Total</b>
            </div>
            <div>
              <span>
                <b style="font-size: 27px; color: red;"
                  >{{ mTotalPrice | currency("฿") }}
                </b>
              </span>
            </div>
          </div>

          <Payment
            @onResult="onPaymentResult"
            :totalNumber="mTotalPrice"
            :order_list="JSON.stringify(mOrderArray)"
          />

          <!-- Waiting order image-->
          <div
            v-if="mOrderArray.length == 0"
            class="d-flex flex-column justify-center align-center"
            style="height: 80%;"
          >
            <img
              src="@/assets/waiting_for_sale.png"
              style="height: 200px; width: 200px;"
            />
          </div>

          <div
            class="d-flex flex-column mt-5"
            style="max-height: 55vh; overflow-y: scroll;"
          >
            <v-card
              v-ripple
              outlined
              class="ma-2"
              v-for="(item, index) in mOrderArray"
              :key="index"
            >
              <v-list-item>
                <v-list-item-avatar color="grey">
                  <img :src="item.image | imageUrl" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.price | currency("฿") }} x {{ item.qty }} pcs.
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar>
                  <v-icon
                    color="#0003"
                    @click="removeOrder(item)"
                    v-ripple
                    class="ml-2"
                  >
                    delete
                  </v-icon>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </div>
          <v-btn @click="clearOrders" v-if="mOrderArray.length > 0">
            clear
          </v-btn>
        </v-card>
      </v-col>

      <!-- Payment Dialog -->
      <v-col cols="12">
        <v-dialog v-model="payment_dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Payment successfully</v-card-title>

            <v-card-text> Change : {{ mChange | currency("฿") }} </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                @click="payment_dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import api from "../services/api";
import Product from "@/types/product.types";
import { Vue, Component } from "vue-property-decorator";
import Payment from "@/views/Payment.vue";
@Component({
  components: { Payment },
})
export default class Shop extends Vue {
  private mDataArray: Product[] = [];
  private mOrderArray: Product[] = [];
  private mChange = 0;
  private mTaxAmt = 0;
  private mTotalPrice = 0;
  private payment_dialog = false;
  mounted() {
    this.loadProducts();
  }
  countSumPrice() {
    this.mTotalPrice = 0;
    for (const item of this.mOrderArray) {
      this.mTotalPrice += item.price * item.qty!;
    }
    this.mTaxAmt = this.mTotalPrice * 0.07;
  }
  pushNewOrder(item: any) {
    const foundIndex = this.mOrderArray.indexOf(item);
    if (foundIndex == -1) {
      item.qty = 1;
      this.mOrderArray.unshift(item);
    } else {
      item.qty++;
    }
    this.countSumPrice();
  }
  removeOrder(selectedItem: any) {
    const index = this.mOrderArray.indexOf(selectedItem);
    this.mDataArray.map((item) => {
      if (item.product_id == selectedItem.product_id) {
        item.qty = 0;
      }
    });
    this.mOrderArray.splice(index, 1);
    this.countSumPrice();
  }
  clearOrders() {
    for (let i = 0; i < this.mDataArray.length; i++) {
      this.mDataArray[i].qty = 0;
    }
    this.mOrderArray = [];
    this.countSumPrice();
  }
  onPaymentResult(result: any) {
    if (result.status == "ok") {
      this.clearOrders();
      this.mChange = result.change;
      this.payment_dialog = true;
    }
  }
  async loadProducts() {
    const result = await api.getProducts();
    this.mDataArray = result.data;
  }
}
</script>

<style></style>
