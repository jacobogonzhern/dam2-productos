import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../models/product.model';

// providedIn: 'root' -> una única instancia del servicio para toda la app
@Injectable({ providedIn: 'root' })
export class ProductService {
  // inject(): forma moderna de inyectar dependencias (sin constructor)
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';

  // limit = productos por página, skip = cuántos productos se saltan
  // Ejemplo: limit=10, skip=20 -> GET /products?limit=10&skip=20 (página 3)
  getProducts(limit = 10, skip = 0): Observable<ProductsResponse> {
    const params = new HttpParams().set('limit', limit).set('skip', skip);
    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }
}
