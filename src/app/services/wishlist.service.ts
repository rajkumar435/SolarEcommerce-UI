import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private key='wishlist';

  private items:any[]=
  JSON.parse(
    localStorage.getItem(this.key)
    || '[]'
  );

  save()
  {
    localStorage.setItem(
      this.key,
      JSON.stringify(this.items)
    );
  }

  add(product:any)
  {
    const exists =
    this.items.find(
      x => x.id === product.id
    );

    if(!exists)
    {
      this.items.push(product);
      this.save();
    }
  }

  getItems()
  {
    return this.items;
  }

  remove(id:number)
  {
    this.items =
    this.items.filter(
      x => x.id !== id
    );

    this.save();
  }

  count()
  {
    return this.items.length;
  }
}