import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryDialogComponent } from '../add-edit-category-dialog/add-edit-category-dialog.component';
import Swal from 'sweetalert2';

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

  // Eliminar
  deleteProduct(row: Product): void {
    // Verifica que productoId existe en el objeto antes de llamar al servicio
    if (row.productoId !== undefined) {
      // Muestra la alerta de confirmación antes de eliminar el producto
      Swal.fire({
        title: 'Confirmar Eliminación',
        text: '¿Estás seguro de que quieres eliminar este producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Llama al servicio para eliminar el producto
          this.productosService.deleteProduct(row.productoId).subscribe(
            () => {
              // Elimina el producto de la lista (simulado para este ejemplo)
              this.productos = this.productos.filter(p => p.productoId !== row.productoId);
              this.dataSource.data = this.productos;
  
              // Muestra una alerta de éxito con SweetAlert2
              Swal.fire({
                icon: 'success',
                title: 'Producto Eliminado',
                text: 'El producto fue eliminado con éxito.',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
              });
            },
            (error) => {
              console.error('Error deleting product:', error);
  
              // Muestra una alerta de error con SweetAlert2
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al eliminar el producto.',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
              });
            }
          );
        }
      });
    } else {
      console.error('El producto no tiene un ID válido:', row);
    }
  }
}
