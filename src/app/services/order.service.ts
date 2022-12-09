import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { environment } from '../../environments/environment';
import { Order } from '../models/order';
import { ProductOrder } from '../models/product-order.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order = new BehaviorSubject<Order>(new Order);

  constructor(private http: HttpClient) {
    this.checkOrderSession();
  }

  index(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.url_backend}/orders`);    
  }
  show(id: number): Observable<Order> {
    return this.http.get<Order>(`${environment.url_backend}/orders/${id}`);    
  }
  destroy(id:number):Observable<Order> {
    console.log(id);
    return this.http.delete<Order>(`${environment.url_backend}/orders/${id}`);
  }
  indexByFarm(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.url_backend}/farms/${id}/orders`);    
  }
  removeProduct(product: Product): Observable<Order> {
    if (this.order.value.products?.length > 0) {
      const productOrder = this.order.value.products.find(productItem => productItem.id === product.id);
      if (productOrder?.quantityOrder) {
        productOrder.quantityOrder -= 1;
        return this.http.put<Order>(`${environment.url_backend}/orders/${this.order.value.id}`, this.order.value);
      }
    }
    return of<Order>(this.order.value);
  }

  addProduct(product: Product): Observable<Order> {
    if (this.order.value.products?.length > 0) {
      const productOrder = this.order.value.products.find(productItem => productItem.id === product.id);
      if (productOrder) {
        productOrder.quantityOrder += 1;
      } else {
        const newProduct = {
          quantityOrder: 1,
          id: product.id
        } as ProductOrder

        this.order.value.products.push(newProduct);
      }
      
      return this.http.put<Order>(`${environment.url_backend}/orders/${this.order.value.id}`, this.order.value);
    } else {
      this.order.value.products = [
        {
          quantityOrder: 1,
          id: product.id
        } as ProductOrder
      ]
      return this.http.post<Order>(`${environment.url_backend}/orders`, this.order.value);
    }
  }

  getOrderValue() {
    return this.order.value;
  }

  setOrder(order: Order) {
    this.order.next(order);
  }

  getOrder() {
    return this.order.asObservable();
  }

  saveOrderSesion(order: Order) {
    if (!order) {
      order = new Order();
    }
    localStorage.setItem('order', JSON.stringify(order));
    this.setOrder(order);
  }

  checkOrderSession() {
    let orderSession : Order = JSON.parse(localStorage.getItem('order'));
    if (orderSession)
      this.setOrder(orderSession);
  }

  deleteSessionData() {
    this.destroy(this.order.value.id).subscribe((data) => {
      console.log('delete')
    });
    localStorage.removeItem('order');
    this.setOrder(new Order());
  }
}
