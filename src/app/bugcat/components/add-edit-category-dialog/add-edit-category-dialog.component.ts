import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-add-edit-category-dialog',
  templateUrl: './add-edit-category-dialog.component.html',
  styleUrls: ['./add-edit-category-dialog.component.css']
})
export class AddEditCategoryDialogComponent {
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<AddEditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Si está en modo de edición, inicializa el formulario con los datos del producto
    // Inicializa el formulario aquí
    this.productForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      stock: [0, [Validators.required, Validators.min(0)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      imagen: ['', [Validators.required]],
      categoriaId: [0, [Validators.required]]
    });

    // Si está en modo de edición, inicializa el formulario con los datos del producto
    if (this.data.editMode) {
      const product = this.data.product as Product;
      this.productForm.patchValue({
        nombre: product.nombre,
        descripcion: product.descripcion,
        stock: product.stock,
        precio: product.precio,
        imagen: product.imagen,
        categoriaId: product.categoriaId
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      // ... (Código existente)

      Swal.fire({
        title: this.data.editMode ? 'Confirmar Edición' : 'Confirmar Agregado',
        text: this.data.editMode ? 'Desea editar este producto?' : 'Desea agregar este producto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          // Llama al servicio para agregar o editar el producto
          const productOperation = this.data.editMode ?
            this.productService.updateProduct(this.productForm.value) :
            this.productService.addProduct(this.productForm.value);

          productOperation.subscribe(
            (resultProduct) => {
              // Cierra el diálogo y pasa el producto modificado/agregado al componente principal
              this.dialogRef.close(resultProduct);

              // Muestra una alerta de éxito con SweetAlert2
              Swal.fire({
                icon: 'success',
                title: this.data.editMode ? 'Producto Editado' : 'Producto Agregado',
                text: `El producto fue ${this.data.editMode ? 'editado' : 'agregado'} con éxito.`,
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
              });
            },
            (error) => {
              console.error('Error adding/updating product:', error);

              // Muestra una alerta de error con SweetAlert2
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Ocurrió un error al ${this.data.editMode ? 'editar' : 'agregar'} el producto.`,
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
              });
            }
          );
        }
      });
    }
  }
}
