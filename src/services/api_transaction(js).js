import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getTransactions = () => {
  return httpClient.get(server.TRANSACTION_URL);
};


export const sendTransaction = (data) => {
  return httpClient.post(server.TRANSACTION_URL, data);
};
