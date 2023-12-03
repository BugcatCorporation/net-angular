import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryDialogComponent } from '../add-edit-category-dialog/add-edit-category-dialog.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'stock', 'precio', 'imagen', 'categoriaId', 'actions'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public productos: Product[] = [];

  constructor(
    private productosService: ProductService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.productos)
  }

  ngOnInit(): void {
    this.productosService.getProducts().subscribe(productos => {
      this.productos = productos;
      this.dataSource.data = this.productos
      console.log('Productos:', this.productos);
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  // Inicio del dialog para agregar el producto
  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoryDialogComponent, {
      width: '400px',
      data: {} // Puedes pasar datos al dialog si es necesario
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Resultado del formulario
        console.log(result);
  
        // Puedes llamar al servicio para agregar el producto aquí
        // this.productosService.addProduct(result).subscribe(...);
  
        // Actualiza la lista de productos (simulado para este ejemplo)
        this.productos.push(result);
        this.dataSource.data = this.productos;
      }
    });
  }

  // Método para abrir el diálogo de edición
  openEditProductDialog(row: Product): void {
    const dialogRef = this.dialog.open(AddEditCategoryDialogComponent, {
      width: '400px',
      data: { product: { ...row }, editMode: true } // Pasa el producto y activa el modo de edición
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Resultado del formulario
        console.log(result);

        // Puedes llamar al servicio para actualizar el producto aquí
        // this.productosService.updateProduct(result).subscribe(...);

        // Actualiza la lista de productos (simulado para este ejemplo)
        const index = this.productos.findIndex(p => p.productoId === row.productoId);
        this.productos[index] = result;
        this.dataSource.data = [...this.productos];
      }
    });
  }
}
