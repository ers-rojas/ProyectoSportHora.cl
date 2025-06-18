import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class ClienteRegistroComponent implements OnInit {
  form!: FormGroup;
  alerta: { tipo: 'exitoso' | 'cancelado' | 'error'; monto?: number } | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.form = this.fb.group({
      nombreCentro: ['', Validators.required],
      rut: ['', [Validators.required, this.rutValidator]],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{1,8}$/)]],
      confirmarPassword: ['', Validators.required],
      aceptarTerminos: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const pago = params.get('pago');
      if (pago) {
        this.alerta = {
          tipo: pago as any,
          monto: Number(params.get('monto')) || undefined
        };
        // Limpia la barra de direcciones quitando los parámetros
        history.replaceState(null, '', this.route.snapshot.routeConfig?.path ? '/cliente-registro' : location.pathname);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Primero registra al cliente/usuario
    const regPayload = {
      email: this.form.value.email,
      password: this.form.value.password,
      nombreCentro: this.form.value.nombreCentro,
      telefono: this.form.value.telefono
    };

    this.http.post('/api/registro-cliente/', regPayload).subscribe({
      next: () => {
        // Luego inicia el pago
        const payload = { ...this.form.value, email: this.form.value.email, telefono: this.form.value.telefono };
        this.http.post<any>('/api/webpay/init/', payload).subscribe({
          next: res => this.redirectToWebpay(res.url, res.token),
          error: err => alert('Error al iniciar pago: ' + (err.error?.detail || 'intente nuevamente'))
        });
      },
      error: err => alert('Error al registrar usuario: ' + (err.error?.detail || ''))
    });
  }

  private redirectToWebpay(url: string, token: string): void {
    // Crea y envía un formulario a Webpay (método recomendado)
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'token_ws';
    input.value = token;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  }

  // --- Validadores y utilidades ---
  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmarPassword')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  onRutInput(event: any): void {
    let value: string = event.target.value;
    // Solo permitir dígitos, puntos y guion, y k/K
    value = value.replace(/[^0-9kK.\-]/g, '');
    // Limitar tamaño razonable (14 caracteres)
    if (value.length > 14) {
      value = value.slice(0, 14);
    }
    this.form.get('rut')?.setValue(value, { emitEvent: false });
  }

  formatRut(): void {
    const rawInput = this.form.get('rut')?.value as string;
    if (!rawInput) return;
    const clean = rawInput.replace(/[.\-]/g, '').toUpperCase();
    if (!/^\d{7,8}[0-9K]$/.test(clean)) return; // No formatear si no cumple
    this.form.get('rut')?.setValue(this.prettyRut(clean), { emitEvent: false });
  }

  private prettyRut(cleanRut: string): string {
    const dv = cleanRut.slice(-1);
    let cuerpo = cleanRut.slice(0, -1);
    let formatted = '';
    while (cuerpo.length > 3) {
      formatted = '.' + cuerpo.slice(-3) + formatted;
      cuerpo = cuerpo.slice(0, -3);
    }
    formatted = cuerpo + formatted;
    return `${formatted}-${dv}`;
  }

  // -------- RUT Validator ---------
  private rutValidator = (control: AbstractControl): ValidationErrors | null => {
    const val: string = control.value;
    if (!val) return null;
    const clean = val.replace(/[.\-]/g, '').toUpperCase();
    // Debe ser 8 o 9 dígitos + dígito verificador (num o K)
    if (!/^\d{7,8}[0-9K]$/.test(clean)) {
      return { rutInvalid: true };
    }
    return null;
  };
} 