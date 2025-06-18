import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { ClienteApiService } from '../services/cliente-api.service';

interface Cancha {
  nombre: string;
  numero: number;
  tipo: string;
  estado: 'Disponible' | 'Mantenimiento' | 'Cerrado';
  ultimaMantencion: string;
  proximaMantencion: string;
}

@Component({
  standalone: true,
  selector: 'app-cliente-canchas',
  templateUrl: './cliente-canchas.component.html',
  styleUrls: ['./cliente-canchas.component.scss'],
  imports: [CommonModule, RouterModule, NgChartsModule]
})
export class ClienteCanchasComponent {
  mostrarTabla = true;

  canchas: Cancha[] = [];

  get totalCanchas() { return this.canchas.length; }
  get canchasDisponibles() { return this.canchas.filter(c => c.estado === 'Disponible').length; }
  get canchasMantenimiento() { return this.canchas.filter(c => c.estado === 'Mantenimiento').length; }
  get canchasCerradas() { return this.canchas.filter(c => c.estado === 'Cerrado').length; }

  // Gráfico 1: distribución por estado (torta)
  chartEstado: ChartData<'doughnut'> = { labels: [], datasets: [] };

  optionsDoughnut: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right' } }
  };

  // Gráfico 2: mantenciones programadas por mes
  chartMantenciones: ChartData<'bar'> = { labels: [], datasets: [] };

  optionsBar: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: {}, y: { beginAtZero: true } }
  };

  // Gráfico 3: utilización por tipo de cancha
  chartUtilizacion: ChartData<'bar'> = { labels: [], datasets: [] };

  // El tipo más utilizado (para texto al costado)
  canchaMasUtilizada = '';

  constructor(private api: ClienteApiService) {
    this.cargar();
  }

  private cargar() {
    this.api.getCanchas().subscribe((data:any)=>{
      this.canchas = data;
    });
  }

  toggleVista(tabla: boolean) {
    this.mostrarTabla = tabla;
  }
} 