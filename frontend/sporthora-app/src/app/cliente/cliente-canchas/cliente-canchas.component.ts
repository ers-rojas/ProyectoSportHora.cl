import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';

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

  canchas: Cancha[] = [
    { nombre: 'Fútbol 11 Norte', numero: 10, tipo: 'Fútbol', estado: 'Disponible', ultimaMantencion: '12/03/2025', proximaMantencion: '15/04/2025' },
    { nombre: 'Padel Techado', numero: 21, tipo: 'Padel', estado: 'Mantenimiento', ultimaMantencion: '05/03/2025', proximaMantencion: '30/03/2025' },
    { nombre: 'Tenis Cemento', numero: 25, tipo: 'Tenis', estado: 'Disponible', ultimaMantencion: '20/02/2025', proximaMantencion: '20/04/2025' },
    { nombre: 'Fútbito Sur', numero: 11, tipo: 'Fútbol', estado: 'Cerrado', ultimaMantencion: '28/02/2025', proximaMantencion: '-' },
    { nombre: 'Básquetbol Central', numero: 13, tipo: 'Básquetbol', estado: 'Disponible', ultimaMantencion: '15/02/2025', proximaMantencion: '15/05/2025' },
    { nombre: 'Padel Outdoor', numero: 22, tipo: 'Padel', estado: 'Mantenimiento', ultimaMantencion: '01/03/2025', proximaMantencion: '01/04/2025' },
    { nombre: 'Multicancha 1', numero: 31, tipo: 'Multicancha', estado: 'Disponible', ultimaMantencion: '10/03/2025', proximaMantencion: '10/06/2025' },
    { nombre: 'Tenis Rápido', numero: 26, tipo: 'Tenis', estado: 'Cerrado', ultimaMantencion: '22/02/2025', proximaMantencion: '-' }
  ];

  get totalCanchas() { return this.canchas.length; }
  get canchasDisponibles() { return this.canchas.filter(c => c.estado === 'Disponible').length; }
  get canchasMantenimiento() { return this.canchas.filter(c => c.estado === 'Mantenimiento').length; }
  get canchasCerradas() { return this.canchas.filter(c => c.estado === 'Cerrado').length; }

  // Gráfico 1: distribución por estado (torta)
  chartEstado: ChartData<'doughnut'> = {
    labels: ['Disponibles', 'En mantención', 'Cerradas'],
    datasets: [{
      data: [this.canchasDisponibles, this.canchasMantenimiento, this.canchasCerradas],
      backgroundColor: ['#4caf50', '#ffc107', '#d32f2f']
    }]
  };

  optionsDoughnut: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right' } }
  };

  // Gráfico 2: mantenciones programadas por mes
  chartMantenciones: ChartData<'bar'> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{ data: [4, 3, 2, 1, 0], backgroundColor: '#9e9e9e' }]
  };

  optionsBar: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: {}, y: { beginAtZero: true } }
  };

  // Gráfico 3: utilización por tipo de cancha
  chartUtilizacion: ChartData<'bar'> = {
    labels: ['Fútbol', 'Pádel', 'Tenis', 'Básquetbol', 'Multicancha'],
    datasets: [{ data: [85, 75, 60, 90, 50], backgroundColor: '#9e9e9e' }]
  };

  // El tipo más utilizado (para texto al costado)
  canchaMasUtilizada = 'Básquetbol (90%)';

  toggleVista(tabla: boolean) {
    this.mostrarTabla = tabla;
  }
} 