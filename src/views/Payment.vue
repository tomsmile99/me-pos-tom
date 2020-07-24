<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mt-7" block v-on="on">Payment</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Payment</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-form>
                  <!-- Change section -->
                  <v-text-field :value="changeMoney" label="Change" disabled />

                  <!-- Given section -->

                  <v-text-field v-model="paidNumber" type="text" label="Paid" />
                </v-form>

                <!-- v-btns section -->
                <v-row>
                  <v-col cols="4"
                    ><v-btn class="secondary" block @click="onPaidChange(1000)"
                      >฿1,000</v-btn
                    ></v-col
                  >
                  <v-col cols="4"
                    ><v-btn class="secondary" block @click="onPaidChange(500)"
                      >฿500</v-btn
                    ></v-col
                  >
                  <v-col cols="4"
                    ><v-btn class="secondary" block @click="onPaidChange(100)"
                      >฿100</v-btn
                    ></v-col
                  >
                </v-row>

                <!-- v-btns section -->
                <v-row>
                  <v-col cols="4"
                    ><v-btn class="secondary" block @click="onPaidChange(50)"
                      >฿50</v-btn
                    ></v-col
                  >
                  <v-col cols="4"
                    ><v-btn class="secondary" block @click="onPaidChange(20)"
                      >฿20</v-btn
                    ></v-col
                  >
                  <v-col cols="4"
                    ><v-btn class="secondary" block @click="onPaidChange(10)"
                      >฿10</v-btn
                    ></v-col
                  >
                </v-row>

                <!-- v-btns section -->
                <v-row>
                  <v-col cols="2"
                    ><v-btn class="error" block @click="onClear"
                      >CLEAR</v-btn
                    ></v-col
                  >
                  <v-col cols="2"
                    ><v-btn class="info" block @click="onPaidExact"
                      >EXACT</v-btn
                    ></v-col
                  >
                  <v-col cols="8"
                    ><v-btn
                      class="primary"
                      block
                      :disabled="!isPaidEnough"
                      @click="onSubmit"
                      >PAYMENT</v-btn
                    ></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onCancel">CANCEL</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import api from "@/services/api";

export default {
  props: {
    totalNumber: Number,
    order_list: String,
  },
  data: () => ({
    dialog: false,
    paidNumber: 0,
  }),
  computed: {
    changeMoney() {
      const change = this.paidFloat - this.totalNumber;
      if (change > 0) {
        return change;
      }
      return "";
    },
    isPaidEnough() {
      if (this.paidFloat >= this.totalNumber) {
        return true;
      }
      return false;
    },
    paidFloat() {
      return parseFloat(this.paidNumber.toString().replace(/,/g, ""));
    },
  },
  watch: {
    paidNumber: function(newValue) {
      const result = newValue
        .toString()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.paidNumber = result));
    },
  },
  methods: {
    onPaidChange(paid) {
      this.paidNumber = this.paidFloat + paid;
    },
    onClear() {
      this.paidNumber = 0;
    },
    onPaidExact() {
      this.paidNumber = this.totalNumber;
    },
    onCancel() {
      this.dialog = false;
      this.$emit("onResult", {
        result: "nok",
        change: 0,
      });
    },
    async onSubmit() {
      const trans = {
        total: this.totalNumber,
        paid: this.paidFloat,
        change: this.changeMoney,
        payment_type: "cash",
        payment_detail: "full",
        seller_id: "sr0001",
        buyer_id: "by0000",
        order_list: this.order_list,
      };
      const result = await api.sendTransaction(trans);
      this.dialog = false;
      this.$emit("onResult", {
        status: "ok",
        change: this.changeMoney,
      });
    },
  },
};
</script>

<style></style>
