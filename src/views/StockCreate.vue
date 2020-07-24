<template>
  <v-container>
    <v-card class="mx-auto  pa-5" outlined>
      <v-form @submit.prevent="submit" ref="form">
        <v-text-field
          v-model="product.name"
          :counter="10"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          suffix="THB"
          type="number"
          v-model="product.price"
          label="Price"
          required
        ></v-text-field>

        <v-text-field
          suffix="PCS"
          v-model="product.stock"
          label="Stock"
          required
        ></v-text-field>

        <input type="file" @change="onFileSelected" />
        <br />
        <v-img v-if="imageURL" :src="imageURL" width="500" class="mt-3" />
        <br />
        <br />
        <v-layout row>
          <v-spacer></v-spacer>
          <v-btn class="mr-4" @click="cancel">
            Cancel
          </v-btn>

          <v-btn color="success" type="submit">
            Confirm
          </v-btn>
        </v-layout>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Product from "@/types/product.types";
import api from "@/services/api";

@Component
export default class StockCreate extends Vue {
  private product: Product = {
    name: "",
    image: "",
    price: 100,
    stock: 10,
  };

  private imageURL = null;

  async submit() {
    const form = new FormData();
    const { name, image, stock, price } = this.product;
    form.append("name", name);
    form.append("stock", stock.toString());
    form.append("price", price.toString());
    form.append("image", image);
    await api.addProduct(form);
    this.$router.push("/stock");
  }

  onFileSelected(event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageURL = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    this.product.image = event.target.files[0];
  }

  cancel() {
    this.$router.back();
  }
}
</script>

<style></style>
