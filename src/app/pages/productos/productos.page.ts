import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
} from '@ionic/angular';
import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    ThemeToggleComponent,
    CurrencyPipe, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
  ],
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);
  // Angular 22 es zoneless: hay que avisar a Angular cuando llegan datos asíncronos
  private cdr = inject(ChangeDetectorRef);

  products: Product[] = [];
  total = 0;
  loading = false;
  error = '';

  // Paginación
  page = 1;
  readonly pageSize = 10;

  // Número de páginas: 194 productos / 10 por página -> 20 páginas
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;  // muestra el spinner
    this.error = '';      // borra errores anteriores

    // Productos que hay que saltarse según la página (página 3 -> salta 20)
    const skip = (this.page - 1) * this.pageSize;

    this.productService.getProducts(this.pageSize, skip).subscribe({
      // La API responde bien: se guardan los productos y el total
      next: (response: ProductsResponse) => {
        this.products = response.products;
        this.total = response.total;
        this.loading = false;
        this.cdr.markForCheck(); // repinta la vista con los productos
      },
      // La API falla: se muestra la tarjeta de error con "Reintentar"
      error: (error) => {
        console.error(error);
        this.error = 'No se han podido cargar los productos.';
        this.loading = false;
        this.cdr.markForCheck(); // repinta la vista con el error
      }
    });
  }

  // Cambia de página sin salirse del rango [1, totalPages]
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
