import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css']
})
export class AddProductComponent {

  productForm: FormGroup;

  imageBase64: string = '';

  imageName: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      stock: [0, Validators.required]
    });
  }

  selectedFile!: File;

onFileSelected(event: any)
{
  this.selectedFile =
    event.target.files[0];
}

 save() {

  const formData =
    new FormData();

  formData.append(
    'name',
    this.productForm.value.name
  );

  formData.append(
    'description',
    this.productForm.value.description
  );

  formData.append(
    'price',
    this.productForm.value.price
  );

  formData.append(
    'stock',
    this.productForm.value.stock
  );

  formData.append(
    'imageFile',
    this.selectedFile
  );

  this.productService
    .addProduct(formData)
    .subscribe({
      next: () => {

        alert('Product Added');

        this.router.navigate(['/products']);
      }
    });
}
}