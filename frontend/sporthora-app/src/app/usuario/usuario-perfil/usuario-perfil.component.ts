import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../autenticacion-usuario/services/auth.service';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss'],
  standalone: false
})
export class UsuarioPerfilComponent {
  constructor(private auth: AuthService, private router: Router) {}

  confirmarLogout(): void {
    Swal.fire({
      icon: 'question',
      title: '¿Desea salir de la cuenta?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.auth.logout();
        this.router.navigate(['/home']);
      }
    });
  }
} 