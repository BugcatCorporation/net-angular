import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private router: Router) {}


  onLoginClick(): void {
    // Aquí puedes realizar lógica de autenticación si es necesario

    // Después de la autenticación, redirige a la nueva ruta
    this.router.navigate(['/bugcat/categories']);
  }
}
