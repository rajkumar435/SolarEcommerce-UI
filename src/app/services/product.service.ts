import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api =
    'https://localhost:7259/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getHeaders() {

    const token =
      localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization:
          `Bearer ${token}`
      })
    };
  }

  getProducts() {

    return this.http.get(
      this.api,
      this.getHeaders()
    );
  }

  getProduct(id: number) {

    return this.http.get(
      `${this.api}/${id}`,
      this.getHeaders()
    );
  }
  getById(id:number)
{
  return this.http.get(
    `${this.api}/${id}`
  );
}

  addProduct(data: any) {

    return this.http.post(
      this.api,
      data,
      this.getHeaders()
    );
  }
}