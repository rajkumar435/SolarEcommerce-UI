import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cart';

  private items:any[] =
  JSON.parse(
    localStorage.getItem('cart') || '[]'
  );

  private saveCart()
  {
    localStorage.setItem(
      this.cartKey,
      JSON.stringify(this.items)
    );
  }

  addToCart(product:any)
  {
    const existing =
    this.items.find(
      x => x.id === product.id
    );

    if(existing)
    {
      existing.quantity++;
    }
    else
    {
      this.items.push({
        ...product,
        quantity:1
      });
    }

    this.saveCart();
  }

  getItems()
  {
    return this.items;
  }

  removeItem(id:number)
  {
    this.items =
    this.items.filter(
      x => x.id !== id
    );

    this.saveCart();
  }

  increase(id:number)
  {
    const item =
    this.items.find(
      x => x.id === id
    );

    if(item)
    {
      item.quantity++;
      this.saveCart();
    }
  }

  decrease(id:number)
  {
    const item =
    this.items.find(
      x => x.id === id
    );

    if(item && item.quantity > 1)
    {
      item.quantity--;
      this.saveCart();
    }
  }

  clearCart()
  {
    this.items = [];

    localStorage.removeItem(
      this.cartKey
    );
  }

  getCount()
  {
    return this.items.reduce(
      (sum,item)=>
      sum + item.quantity,
      0
    );
  }

  getTotal()
  {
    return this.items.reduce(
      (sum,item)=>
      sum + (item.price * item.quantity),
      0
    );
  }
}