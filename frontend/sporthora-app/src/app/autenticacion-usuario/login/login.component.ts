import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showPassword = false;
  showRoleModal = false;
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

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

  onSubmit(): void {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.auth.login(email, password).subscribe({
      next: (res) => {
        this.auth.setSession(res.token, res.user_type);
        if (res.user_type === 'cliente') {
          this.router.navigate(['/cliente']);
        } else {
          this.router.navigate(['/usuario']);
        }
      },
      error: (err) => {
        alert(err.error?.detail || 'Credenciales incorrectas');
      }
    });
  }
} 