



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CartService }
from '../../services/cart.service';

@Component({
  selector:'app-cart',
  standalone:true,
  imports:[
    CommonModule,
    RouterModule
  ],
  templateUrl:'./cart.html'
})
export class CartComponent {

  constructor(
    public cartService: CartService
  )
  {
  }

  increase(id:number)
  {
    this.cartService.increase(id);
  }

  decrease(id:number)
  {
    this.cartService.decrease(id);
  }

  remove(id:number)
  {
    this.cartService.removeItem(id);
  }
  
}