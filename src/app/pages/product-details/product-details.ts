import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductService }
from '../../services/product.service';

import { CartService }
from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html'
})
export class ProductDetailsComponent {

  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  )
  {
  }

  ngOnInit()
  {
    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    this.productService
      .getById(id)
      .subscribe(res =>
      {
        this.product = res;
      });
  }

  addToCart()
  {
    this.cartService.addToCart(
      this.product
    );

    alert('Added To Cart');
  }
}