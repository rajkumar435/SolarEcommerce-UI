import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistService }
from '../../services/wishlist.service';

@Component({
  selector:'app-wishlist',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./wishlist.html'
})
export class WishlistComponent {

  constructor(
    public wishlistService:
    WishlistService
  )
  {
  }

  remove(id:number)
  {
    this.wishlistService.remove(id);
  }
}