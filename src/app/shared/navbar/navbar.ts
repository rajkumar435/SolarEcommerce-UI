import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService }
from '../../services/cart.service';
import { WishlistService }
from '../../services/wishlist.service';
import {
  Router,
  RouterModule,
  NavigationEnd
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  showNavbar = true;

  constructor(private router: Router,public cartService:CartService,  public wishlistService: WishlistService)
  {
    this.router.events.subscribe(event =>
    {
      if (event instanceof NavigationEnd)
      {
        this.showNavbar =
          !event.url.includes('login') &&
          !event.url.includes('register');
      }
    });
  }
 get cartCount()
{
   return this.cartService.getCount();
}

  logout()
  {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}