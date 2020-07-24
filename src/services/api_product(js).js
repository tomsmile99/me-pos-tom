import { imageUrl } from "./constants";
import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getProducts = () => {
  return httpClient.get(server.PRODUCT_URL);
};

export const getProductById = (id) => {
  return httpClient.get(server.PRODUCT_URL + `/id/${id}`);
};

export const addProduct = (data) => {
  return httpClient.post(server.PRODUCT_URL, data);
};

export const deleteProduct = (id) => {
  return httpClient.delete(server.PRODUCT_URL + `/id/${id}`);
};

export const updateProduct = (data) => {
  return httpClient.put(server.PRODUCT_URL, data);
};
