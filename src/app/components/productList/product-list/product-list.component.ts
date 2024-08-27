import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products!: Array<any>;
  selectedSkus: string[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  toggleSelection(sku: string): void {
    if (this.selectedSkus.includes(sku)) {
      this.selectedSkus = this.selectedSkus.filter((id) => id !== sku);
    } else {
      this.selectedSkus.push(sku);
    }
  }

  deleteSelectedProducts(): void {
    this.productService.deleteProducts(this.selectedSkus);
    this.selectedSkus = [];
    this.products = this.productService.getProducts(); // Refresh the list
  }
}
