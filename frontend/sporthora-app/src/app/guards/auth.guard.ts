import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../autenticacion-usuario/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isLoggedIn() && this.auth.getUserType() === 'usuario') {
      return true;
    }

    Swal.fire({
      icon: 'info',
      title: 'Acceso restringido',
      text: 'Para poder ingresar a nuestros servicios de reserva debes crear una cuenta.',
      confirmButtonText: 'Ir a iniciar sesión'
    }).then(() => {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    });
    return false;
  }
} 