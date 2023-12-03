import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../interfaces/product.interface';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css']
})
export class InitialPageComponent implements OnInit  {
  
  chartData: any[] = [];
  top5ProductsByPrice: any[] = [];

  colorScheme = 'cool';

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categorías';
  showYAxisLabel = true;
  yAxisLabel = 'Número de Productos';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.generateChartData();
    this.generateTop5ProductsByPrice();
  }

  generateChartData(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      // Ordena los productos por stock de mayor a menor
      const sortedProducts = products.sort((a, b) => b.stock - a.stock);

      // Toma solo los 10 primeros productos
      const top10Products = sortedProducts.slice(0, 10);

      this.chartData = top10Products.map((product) => {
        // const categoryName = product.categoria ? product.categoria.nombre || 'Sin categoría' : 'Sin categoría';

        return {
          name: product.nombre,
          value: product.stock,
          // category: categoryName
        };
      });
    });
  }

  generateTop5ProductsByPrice(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      // Ordena los productos por precio de mayor a menor
      const sortedProducts = products.sort((a, b) => b.precio - a.precio);

      // Toma solo los 5 primeros productos
      const top5Products = sortedProducts.slice(0, 5);

      this.top5ProductsByPrice = top5Products.map((product) => {
        return {
          name: product.nombre,
          value: product.precio,
        };
      });
    });
  }

}
