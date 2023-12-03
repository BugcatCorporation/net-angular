import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-products-card-page',
  templateUrl: './products-card-page.component.html',
  styleUrls: ['./products-card-page.component.css']
})
export class ProductsCardPageComponent implements OnInit {

  productos: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(productos => this.productos = productos)
  }

  

}
