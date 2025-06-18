import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{1,8}$/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.matchValidator });
  }

  private matchValidator = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const conf = group.get('confirmPassword')?.value;
    return pass === conf ? null : { mismatch: true };
  };

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, password } = this.form.value;
    const payload = {
      username: email,
      email,
      first_name: firstName,
      last_name: lastName,
      password
    };

    this.http.post('/api/usuarios/', payload).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Cuenta creada', text: '¡Tu cuenta se creó correctamente!' }).then(() => {
          this.router.navigate(['/auth/login']);
        });
      },
      error: err => {
        Swal.fire({ icon: 'error', title: 'Error', text: err.error?.detail || 'No se pudo crear la cuenta' });
      }
    });
  }
} 