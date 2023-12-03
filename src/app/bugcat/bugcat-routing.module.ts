import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutPageComponent } from "./components/layout-page/layout-page.component";
import { CategoryPageComponent } from "./components/category-page/category-page.component";
import { ProductsPageComponent } from "./components/products-page/products-page.component";
import { ProductsCardPageComponent } from "./components/products-card-page/products-card-page.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            {
                path: 'categories',
                component: CategoryPageComponent
            },
            {
                path: 'products',
                component: ProductsPageComponent
            },
            {
                path: 'productosCard',
                component: ProductsCardPageComponent
            },
            {
                path: '**',
                redirectTo: 'categories'
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class BugcatRoutingModule { }