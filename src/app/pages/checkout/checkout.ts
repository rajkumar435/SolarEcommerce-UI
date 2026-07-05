import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { Router } from '@angular/router';

import { CartService }
from '../../services/cart.service';

import { OrderService }
from '../../services/order.service';

@Component({
  selector:'app-checkout',
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl:'./checkout.html',
  styleUrls:['./checkout.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router
  )
  {
    this.checkoutForm =
      this.fb.group({

        fullName:[''],
        mobile:[''],
        address:[''],
        city:[''],
        state:[''],
        pincode:['']
      });
  }

  ngOnInit()
  {
    this.getCurrentLocation();
  }

  getCurrentLocation()
  {
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(
        position =>
        {
          const lat =
            position.coords.latitude;

          const lng =
            position.coords.longitude;

          console.log(lat,lng);

          this.reverseGeocode(
            lat,
            lng
          );
        },
        error =>
        {
          console.log(error);
        }
      );
    }
  }

  reverseGeocode(
    lat:number,
    lng:number
  )
  {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    )
    .then(res => res.json())
    .then(data =>
    {
      console.log(data);

      this.checkoutForm.patchValue({

        address:
          data.display_name,

        city:
          data.address.city ||
          data.address.town ||
          data.address.village ||
          '',

        state:
          data.address.state ||
          '',

        pincode:
          data.address.postcode ||
          ''
      });
    });
  }

  placeOrder()
  {
   const order = {

  userId: Number(localStorage.getItem('userId')) || 1,

  fullName:
    this.checkoutForm.value.fullName,

  mobile:
    this.checkoutForm.value.mobile,

  address:
    this.checkoutForm.value.address,

  city:
    this.checkoutForm.value.city,

  state:
    this.checkoutForm.value.state,

  pincode:
    this.checkoutForm.value.pincode,

  totalAmount:
    this.cartService.getTotal(),

  items:
    this.cartService.getItems().map(x => ({

      productId: x.id,

      productName: x.name,

      quantity: x.quantity,

      price: x.price
    }))
};

    console.log(order);

    this.orderService
      .placeOrder(order)
      .subscribe({

        next:() =>
        {
          alert(
            'Order Placed Successfully'
          );

          this.cartService.clearCart();

          this.router.navigate(
            ['/orders']
          );
        },

        error:err =>
        {
          console.log(err);
        }
      });
  }
}