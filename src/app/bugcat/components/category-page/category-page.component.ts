import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCategoryDialogComponent } from '../update-category-dialog/update-category-dialog.component';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<Category>;
  categoryForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public categorias: Category[] = [];

  constructor(
    private categoriasService: CategoryService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
    ) {
    this.dataSource = new MatTableDataSource(this.categorias)
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    })
  }


  ngOnInit(): void {
    this.categoriasService.getCategories().subscribe(categorias => {
      this.categorias = categorias;
      this.dataSource.data = this.categorias
      console.log('Categorías:', this.categorias);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const newCategory: Category = {
        nombre: this.categoryForm.value.name
      };

      Swal.fire({
        title: 'Confirmar',
        text: 'Desea agregar esta categoría?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.categoriasService.addCategory(newCategory).subscribe(
            (addedCategory) => {
              this.categorias.push(addedCategory);
              this.dataSource.data = this.categorias;
              this.categoryForm.reset();

              // SweetAlert2 success message after category is added
              Swal.fire({
                icon: 'success',
                title: 'Categoria',
                text: 'La categoría fue agregada con éxito.',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
              });
            },
            (error) => {
              // SweetAlert2 error message after an error occurs
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while adding the category.',
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
              });
              console.error('Error adding category:', error);
            }
          );
        } else {
          // Close the SweetAlert2 without showing another alert
        }
      });
    }
  }
  
  // Fin del código de Crear Categoría

  // Inicio del código de Actualizar Categoría

  openUpdateDialog(category: Category): void {
    const dialogRef = this.dialog.open(UpdateCategoryDialogComponent, {
      width: '300px', // Ajusta el ancho según tus necesidades
      data: { name: category.nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario hizo clic en "Actualizar"
        const updatedCategory: Category = {
          categoriaId: category.categoriaId,
          nombre: result.name
        };

        this.categoriasService.updateCategory(updatedCategory).subscribe(
          (updatedCategory) => {
            // Actualiza la categoría en la lista
            const index = this.categorias.findIndex(c => c.categoriaId === category.categoriaId);
            if (index !== -1) {
              this.categorias[index] = updatedCategory;
              this.dataSource.data = this.categorias;
            }

            // Muestra una alerta de éxito
            Swal.fire({
              icon: 'success',
              title: 'Categoria Actualizada',
              text: 'La categoría fue actualizada con éxito.',
              showCancelButton: false,
              confirmButtonText: 'Aceptar',
            });
          },
          (error) => {
            // Muestra una alerta de error
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Ocurrió un error al actualizar la categoría.',
              showCancelButton: false,
              confirmButtonText: 'Aceptar',
            });
            console.error('Error updating category:', error);
          }
        );
      }
    });
  }

  // Fin del código de Actualizar Categoría

}
