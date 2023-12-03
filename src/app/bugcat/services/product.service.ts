import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "https://localhost:7048"

  constructor(private httpClient: HttpClient) { }

  // https://localhost:7048/BuscarProducto
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/BuscarProducto`)
  }

  // https://localhost:7048/CrearProducto
  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.url}/CrearProducto`, product)
  }

  // https://localhost:7048/ActualizarProducto
  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.url}/ActualizarProducto`, product)
  }

  // https://localhost:7048/EliminarProducto/5
  deleteProduct(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.url}/EliminarProducto/${id}`)
  }


}


