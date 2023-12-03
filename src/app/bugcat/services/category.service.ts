import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = "https://localhost:7048";

  constructor(private httpClient: HttpClient) { }

  // https://localhost:7048/BuscarCategoria
  getCategories(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.url}/BuscarCategoria`);
  }

  // https://localhost:7048/CrearCategoria
  addCategory(category: Category): Observable<Category>{
    return this.httpClient.post<Category>(`${this.url}/CrearCategoria`, category);
  }

  // https://localhost:7048/ActualizarCategoria
  updateCategory(category: Category): Observable<Category>{
    return this.httpClient.put<Category>(`${this.url}/ActualizarCategoria`, category);
  }

}
