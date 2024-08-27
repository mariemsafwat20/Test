import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Array<any> = [
    {
      sku: 'JVC200123',
      name: 'Acme DISC',
      price: 1.00,
      type: 'DVD',
      size: 700,
    },
    {
      sku: 'GGWP0007',
      name: 'War and Peace',
      price: 20.00,
      type: 'Book',
      weight: 2,
    },
    {
      sku: 'JVC200123',
      name: 'Acme DISC',
      price: 1.00,
      type: 'DVD',
      size: 700,
    },
    {
      sku: 'TR120555',
      name: 'Chair',
      price: 40.00,
      type: 'Furniture',
      height: 120,
      width: 60,
      length: 60,
    },
    {
      sku: 'GGWP0007',
      name: 'War and Peace',
      price: 20.00,
      type: 'Book',
      weight: 2,
    },
    {
      sku: 'FURN001',
      name: 'Chair',
      price: 50,
      type: 'Furniture',
      height: 120,
      width: 60,
      length: 60,
    },
    {
      sku: 'TR120555',
      name: 'Chair',
      price: 40.00,
      type: 'Furniture',
      height: 120,
      width: 60,
      length: 60,
    },
  ];

  constructor() { }

  getProducts(){
    // this.products.sort((a, b) => a.sku - b.sku);
    return this.products;
  }

  addProduct(product: any): void {
    this.products.push(product);
  }
  
  deleteProducts(selectedSkus: string[]): void {
    this.products = this.products.filter(
      (product) => !selectedSkus.includes(product.sku)
    );
  }
}
