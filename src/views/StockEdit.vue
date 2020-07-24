<template lang="html">
  <v-container>
    <v-card class="mx-auto  pa-5" outlined>
      <v-form ref="form" @submit.prevent="submit">
        <v-text-field
          v-model="product.name"
          :counter="10"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="product.price"
          suffix="THB"
          type="number"
          label="Price (฿)"
          required
        ></v-text-field>

        <v-text-field
          v-model="product.stock"
          suffix="PCS"
          label="Stock (PCS.)"
          required
        ></v-text-field>

        <input type="file" @change="onFileSelected" />
        <br />
        <img :src="getProductImage()" width="500" class="mt-3" />

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
import api from "@/services/api";
import { imageUrl } from "@/services/constants";
import Product from "@/types/product.types";

@Component
export default class StockEdit extends Vue {
  private product: Product = {
    name: "",
    image: "",
    stock: 0,
    price: 0,
  };

  async mounted() {
    const id = this.$route.params.id;
    const result = await api.getProductById(id);
    this.product = result.data;
  }

  private imageFile = null;

  async submit() {
    const form = new FormData();
    const { name, image, stock, price, product_id } = this.product;
    form.append("product_id", product_id!);
    form.append("name", name);
    form.append("stock", stock.toString());
    form.append("price", price.toString());

    if (this.imageFile) {
      form.append("image", this.imageFile!);
    }

    await api.updateProduct(form);
    this.$router.push("/stock");
  }

  onFileSelected(event: any) {
    // For loading preview image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.product.image = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);

    // For uploading image
    this.imageFile = event.target.files[0];
  }

  getProductImage() {
    if (this.product.image.length > 100) {
      return this.product.image;
    } else {
      // return this.$options.filters.imageUrl(this.product!.image);
      return `${imageUrl}/${this.product.image}`;
    }
  }

  cancel() {
    this.$router.back();
  }
}
</script>

<style></style>
