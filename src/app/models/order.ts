import { ProductOrder } from "./product-order.model";

export class Order {
    id: number;
    total_price: number;
    products: ProductOrder[]
}