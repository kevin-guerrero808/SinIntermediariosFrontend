import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  order: Order;

  ngOnInit(): void {
    this.order = this.orderService.getOrderValue()
    this.orderService.getOrder().subscribe((order) => {
      this.order = order;
    })
  }

}
