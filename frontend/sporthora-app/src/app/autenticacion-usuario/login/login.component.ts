import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showPassword = false;
  showRoleModal = false;

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  openRoleModal(): void {
    this.showRoleModal = true;
  }

  closeRoleModal(): void {
    this.showRoleModal = false;
  }

  chooseRole(role: 'usuario' | 'cliente'): void {
    this.closeRoleModal();
    if (role === 'usuario') {
      this.router.navigate(['/auth/register']);
    } else {
      this.router.navigate(['/cliente-registro']);
    }
  }
} 