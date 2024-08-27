import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})

export class AddProductComponent {
  productForm: FormGroup;
  selectedType: string = '';
  formErrorMessage: string = '';

  constructor(private router: Router, private productService: ProductsService) {
    this.productForm = new FormGroup({
      sku: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]),
      type: new FormControl('', [Validators.required]), // Default empty
      size: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
      width: new FormControl('', Validators.required),
      length: new FormControl('', Validators.required),
    });
  }

  onTypeChange() {
    this.selectedType = this.productForm.controls['type'].value;

    const controls = this.productForm.controls;
    controls['size'].clearValidators();
    controls['weight'].clearValidators();
    controls['height'].clearValidators();
    controls['width'].clearValidators();
    controls['length'].clearValidators();

    controls['size'].setValue('');
    controls['weight'].setValue('');
    controls['height'].setValue('');
    controls['width'].setValue('');
    controls['length'].setValue('');

    if (this.selectedType === 'DVD') {
      controls['size'].setValidators([Validators.required]);
    } else if (this.selectedType === 'Book') {
      controls['weight'].setValidators([Validators.required]);
    } else if (this.selectedType === 'Furniture') {
      controls['height'].setValidators([Validators.required]);
      controls['width'].setValidators([Validators.required]);
      controls['length'].setValidators([Validators.required]);
    }

    this.productForm.updateValueAndValidity();
  }

  onSave() {
    if (this.productForm.invalid) {
      this.formErrorMessage = 'Please, submit required data';
      return;
    }

    const skuExists = this.checkIfSkuExists(this.productForm.controls['sku'].value);
    if (skuExists) {
      this.formErrorMessage = 'SKU already exists. Please, provide a unique SKU.';
      return;
    }

    // Save product logic
    this.productService.addProduct(this.productForm.value);
    this.router.navigate(['/list']);
  }

  onCancel() {
    this.router.navigate(['/list']);
  }

  checkIfSkuExists(sku: string): boolean {
    const products = this.productService.getProducts();
    return products.some(product => product.sku === sku);
  }
}
