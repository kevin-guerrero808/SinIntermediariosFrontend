import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  index(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.url_backend}/products`);    
  }
  show(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.url_backend}/products/${id}`);    
  }
  destroy(id:string){
    return this.http.delete<Product>(`${environment.url_backend}/products/${id}`);
  }
  indexByFarm(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.url_backend}/farms/${id}/products`);    
  }
  create(product: Product, idFarm: number): any {
    return this.http.post(`${environment.url_backend}/farms/${idFarm}/products`, product);
  }
  update(product: Product, idFarm: number): any {
    return this.http.put(`${environment.url_backend}/farms/${idFarm}/products/${product.id}`, product);
  }
}
