import { Routes } from '@angular/router';

import { RegisterComponent } from './pages/register/register';
import { LoginComponent } from './pages/login/login';
import { ProductsComponent } from './pages/products/products';
/*import { ProductDetailsComponent } from './pages/product-details/product-details';*/
import { AddProductComponent } from './pages/add-product/add-product';
import { authGuard } from './guards/auth.guard';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';


export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
  path: '',
  loadComponent: () =>
  {
    const token = localStorage.getItem('token');

    if (token)
    {
      location.href = '/products';
    }
    else
    {
      location.href = '/login';
    }

    return import('./pages/login/login')
      .then(m => m.LoginComponent);
  }
},
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
      canActivate: [authGuard]

  },
   {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/product-details/product-details')
      .then(m => m.ProductDetailsComponent),  canActivate: [authGuard]

  },
  //    {
  //   path: 'product-details',
  //   component: ProductDetailsComponent,
  //     canActivate: [authGuard]

  // },
   {
    path: 'add-product',
    component: AddProductComponent,
      canActivate: [authGuard]

  },
  {
  path:'cart',
  component:CartComponent,
  canActivate:[authGuard]
},
{
 path:'checkout',
 component:CheckoutComponent,
 canActivate:[authGuard]
},
{
  path:'wishlist',
  loadComponent:() =>
  import('./pages/wishlist/wishlist')
  .then(m => m.WishlistComponent)
},
{
 path:'orders',
 loadComponent:() =>
 import(
 './pages/orders/orders'
 ).then(
  m=>m.OrdersComponent
 )
},
];