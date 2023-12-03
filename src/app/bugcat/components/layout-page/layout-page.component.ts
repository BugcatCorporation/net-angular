import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Inicio', icon: 'label', url: './initial' },
    { label: 'Categorias', icon: 'category', url: './categories' },
    { label: 'Productos', icon: 'shopping_cart', url: './products' },
    { label: 'Cards', icon: 'shopping_basket', url: './productosCard' }
  ]

  constructor(private router: Router) { }


  onLogout(): void {
    this.router.navigate(['/auth/login']);
  }

}
