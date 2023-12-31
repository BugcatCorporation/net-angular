import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { BugcatRoutingModule } from './bugcat-routing.module';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { LayoutPageComponent } from './components/layout-page/layout-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateCategoryDialogComponent } from './components/update-category-dialog/update-category-dialog.component';
import { AddEditCategoryDialogComponent } from './components/add-edit-category-dialog/add-edit-category-dialog.component';
import { ProductsCardPageComponent } from './components/products-card-page/products-card-page.component';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    CategoryPageComponent,
    ProductsPageComponent,
    LayoutPageComponent,
    UpdateCategoryDialogComponent,
    AddEditCategoryDialogComponent,
    ProductsCardPageComponent,
    InitialPageComponent
  ],
  imports: [
    CommonModule,
    BugcatRoutingModule,
    MaterialModule,
    ReactiveFormsModule,

    NgxChartsModule
  ],
  
})
export class BugcatModule { }
