import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
} from '@ionic/angular';
import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
  ],
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];
  total = 0;
  loading = false;
  error = '';

  // Paginación
  page = 1;
  readonly pageSize = 10;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    const skip = (this.page - 1) * this.pageSize;

    this.productService.getProducts(this.pageSize, skip).subscribe({
      next: (response: ProductsResponse) => {
        this.products = response.products;
        this.total = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.error = 'No se han podido cargar los productos.';
        this.loading = false;
      }
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page) {
      return;
    }
    this.page = page;
    this.loadProducts();
  }

  // Stock valorado = unidades * precio - descuento aplicable
  stockValue(product: Product): number {
    const bruto = product.stock * product.price;
    const descuento = bruto * (product.discountPercentage / 100);
    return bruto - descuento;
  }
}
