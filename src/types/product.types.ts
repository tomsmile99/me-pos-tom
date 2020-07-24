export default interface Product {
  _id?: string;
  product_id?: string;
  image: any;
  name: string;
  price: number;
  stock: number;
  created?: Date;
  qty?: number;
}
