import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderService }
from '../../services/order.service';

@Component({
  selector:'app-orders',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./orders.html',
  styleUrls:['./orders.css']
})
export class OrdersComponent {

  orders:any[]=[];

  constructor(
    private orderService:OrderService
  )
  {
  }

  ngOnInit()
  {
    this.loadOrders();
  }

  loadOrders()
  {
    this.orderService
      .getOrders()
      .subscribe({
        next:(res:any)=>
        {
          console.log(res);

          this.orders = res;
        },
        error:(err)=>
        {
          console.log(err);
        }
      });
  }
}