<template lang="html">
  <v-container>
    <v-row>
      <!-- Transaction summary section -->
      <v-col :cols="selectedOrderList.length > 0 ? 8 : 12">
        <v-card>
          <v-data-table
            :search="search"
            :headers="headers"
            :items="mDataArray"
            :items-per-page="10"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Transaction</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar>
            </template>

            <template v-slot:item="{ item }">
              <tr
                :class="
                  selectedTransactionId == item.transaction_id
                    ? 'primary'
                    : null
                "
              >
                <td @click="onSelectItem(item)">{{ item.transaction_id }}</td>
                <td @click="onSelectItem(item)">
                  {{ item.timestamp | moment("dd DD/MM/YYYY") }}
                </td>
                <td @click="onSelectItem(item)">
                  {{ item.total | currency("฿") }}
                </td>
                <td @click="onSelectItem(item)">
                  {{ item.paid | currency("฿") }}
                </td>
                <td @click="onSelectItem(item)">{{ item.payment_type }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <!-- Transaction detail section -->
      <v-col v-if="selectedOrderList.length > 0" :cols="4">
        <v-card>
          <v-data-table
            :headers="headersOfDetail"
            :items="selectedOrderList"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>
                  <span class="primary--text">
                    TransactionId : {{ selectedTransactionId }}
                  </span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <span> {{ selectedOrderList.length }} รายการ</span>
              </v-toolbar>
            </template>

            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.product_id }}</td>
                <td>
                  <v-img
                    :src="item.image | imageUrl"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="50"
                    max-height="50"
                  ></v-img>
                </td>
                <td>{{ item.price | currency("฿") }}</td>
                <td>{{ item.qty | number("0,0") }} pcs.</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="js">
import api from "@/services/api";
  export default  {
    name: 'Transaction',
    props: [],
    data () {
      return {
        selectedOrderList: [],
        search:"",
        selectedTransactionId:"",
        confirmDeleteDlg: false,
        mDataArray:[],
        mOrderArray:[],
         headers: [
          { text: 'Id', value: 'transaction_id' },
          { text: 'Created', value: 'timestamp' },
          { text: 'Total', value: 'total' },
          { text: 'Paid', value: 'paid' },
          { text: 'Type', value: 'payment_type' },
        ],
        headersOfDetail: [
          { text: 'Id', value: 'product_id' },
          { text: 'Image', value: 'image' },
          { text: 'Price', value: 'price' },
          { text: 'Qty', value: 'qty' },
        ]
      }
    },
    async mounted () {
      await this.loadTransactions()
    },
    methods: {
      async loadTransactions(){
        const result = await api.getTransactions()
        this.mDataArray = result.data
      },
      onSelectItem(item){
        this.selectedTransactionId = item.transaction_id;
        this.selectedOrderList = JSON.parse(item.order_list)
      }
    }
}
</script>

<style scoped lang="scss"></style>
