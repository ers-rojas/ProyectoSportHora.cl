import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cliente-inicio',
  templateUrl: './cliente-inicio.component.html',
  styleUrls: ['./cliente-inicio.component.scss'],
  imports: [CommonModule, RouterModule, NgChartsModule]
})
export class ClienteInicioComponent {
  // Datos ficticios para los gráficos
  reservasPorDeporte: ChartData<'bar'> = {
    labels: ['Fútbol', 'Tenis', 'Pádel', 'Básquetbol', 'Futbolito'],
    datasets: [{ data: [200, 180, 140, 200, 170], backgroundColor: '#777' }]
  };

  estadosReservas: ChartData<'bar'> = {
    labels: ['Pendientes', 'Confirmadas', 'Canceladas', 'Finalizadas'],
    datasets: [{ data: [40, 60, 10, 80], backgroundColor: '#777' }]
  };

  cancelaciones: ChartData<'doughnut'> = {
    labels: ['Confirmadas', 'Canceladas'],
    datasets: [{ data: [300, 50], backgroundColor: ['#4caf50', '#d32f2f'] }]
  };

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
  ingresosMes = 6200000;
  variacionIngresos = 15; // positivo o negativo
  metaIngresos = 8100000;

  get variacionLabel(): string {
    const abs = Math.abs(this.variacionIngresos);
    return this.variacionIngresos >= 0 ? `${abs}% más que el mes pasado` : `${abs}% menos que el mes pasado`;
  }

  get progresoMeta(): number {
    return Math.min(100, Math.round((this.ingresosMes / this.metaIngresos) * 100));
  }
} 