import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
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
      rut: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
      confirmarPassword: ['', Validators.required],
      aceptarTerminos: [false, Validators.requiredTrue]
    });
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
} 