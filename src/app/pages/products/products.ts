import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService }
from '../../services/product.service';
import { CartService }
from '../../services/cart.service';
import { WishlistService }
from '../../services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,FormsModule
  ],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent {

  products: any[] = [];
  searchText = '';


filteredProducts:any[] = [];

  constructor(
    private productService: ProductService,  private cartService: CartService
,private wishlistService:WishlistService
  ) { }

  ngOnInit() {

    this.loadProducts();
  }

  addToCart(product:any)
{
   this.cartService.addToCart(product);

   alert('Added To Cart');
}

addToWishlist(product:any)
{
   this.wishlistService.add(product);

   alert(
    'Added To Wishlist'
   );
}
search()
{
  this.filteredProducts =
  this.products.filter(x =>
      x.name
      .toLowerCase()
      .includes(
       this.searchText
       .toLowerCase()
      )
  );
}

page = 1;

pageSize = 8;
get pagedProducts()
{
  const start =
  (this.page - 1) * this.pageSize;

  return this.filteredProducts.slice(
    start,
    start + this.pageSize
  );
}
  loadProducts() {

    this.productService
      .getProducts()
      .subscribe({
        next: (res: any) => {

         this.products = res;

this.filteredProducts = res;
        },
        error: err => {

          console.log(err);
        }
      });
  }
}