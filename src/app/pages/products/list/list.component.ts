import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../models/order';
import { Product } from '../../../models/product.model';
import { ProductVM } from '../../../modelVMs/product.VM.model';
import { OrderService } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
import { productTemplateModes } from '../product-item/enums/product-template-modes';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  products: ProductVM[] = [];
  productTemplateModes = productTemplateModes;

  constructor(private rutaActiva: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  updateProductState(order: Order) {
    this.products.forEach(product => {
      const productOrder = order.products?.find(productOrder => productOrder.id === product.id);
      if (productOrder) {
        product.quantityOrdered = productOrder.quantityOrder;
      } else {
        product.quantityOrdered = 0;
      }
    })
    this.products = this.products.filter(product => product.quantity > 0 || product.quantityOrdered > 0);
  }

  getProducts() {
    this.productService.index().subscribe((products) => {
      this.products = products;
      this.updateProductState(this.orderService.getOrderValue());
    })
  }

  plusProduct(product: Product) {
    this.orderService.addProduct(product).subscribe((order) => {
      this.orderService.saveOrderSesion(order);
      this.ngOnInit();
    });
  }

  minusProduct(product: Product) {
    this.orderService.removeProduct(product).subscribe((order) => {
      this.orderService.saveOrderSesion(order);
      this.ngOnInit();
    });
  }
}
