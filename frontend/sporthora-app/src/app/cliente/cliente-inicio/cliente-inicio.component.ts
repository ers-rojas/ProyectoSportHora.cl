import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-cliente-inicio',
  templateUrl: './cliente-inicio.component.html',
  styleUrls: ['./cliente-inicio.component.scss'],
  imports: [CommonModule, RouterModule, NgChartsModule]
})
export class ClienteInicioComponent implements OnInit {
  // Datos ficticios para los gráficos
  reservasPorDeporte: ChartData<'bar'> = { labels: [], datasets: [] };

  estadosReservas: ChartData<'bar'> = { labels: [], datasets: [] };

  cancelaciones: ChartData<'doughnut'> = { labels: [], datasets: [] };

  optionsBar: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: {}, y: { beginAtZero: true } }
  };

  optionsDoughnut: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right' } }
  };

  // Métricas demo
  ingresosMes = 0;
  variacionIngresos = 0;
  metaIngresos = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const pago = params.get('pago');
      if (pago === 'exitoso') {
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido a SportHora!',
          text: 'Tu pago fue procesado correctamente y tu cuenta está habilitada.',
          confirmButtonColor: '#4caf50'
        });
        history.replaceState(null, '', this.route.snapshot.routeConfig?.path ? '/cliente' : location.pathname);
      } else if (pago === 'error') {
        Swal.fire({ icon: 'error', title: 'Oops', text: 'Hubo un problema al confirmar el pago.' });
      }
    });
  }

  get variacionLabel(): string {
    const abs = Math.abs(this.variacionIngresos);
    return this.variacionIngresos >= 0 ? `${abs}% más que el mes pasado` : `${abs}% menos que el mes pasado`;
  }

  get progresoMeta(): number {
    return Math.min(100, Math.round((this.ingresosMes / this.metaIngresos) * 100));
  }
} 