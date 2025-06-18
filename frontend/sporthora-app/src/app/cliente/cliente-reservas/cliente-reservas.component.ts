import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { ClienteApiService } from '../services/cliente-api.service';

interface Reserva {
  usuario: string;
  fecha: string;
  hora: string;
  cancha: number;
  tipo: string;
  estado: string;
  duracion: string;
  precio: string;
  metodo: string;
}

@Component({
  standalone: true,
  selector: 'app-cliente-reservas',
  templateUrl: './cliente-reservas.component.html',
  styleUrls: ['./cliente-reservas.component.scss'],
  imports: [CommonModule, RouterModule, NgChartsModule]
})
export class ClienteReservasComponent {
  mostrarTabla = true;

  // Datos de ejemplo para la tabla
  reservas: Reserva[] = [];

  // Datos de ejemplo para el gráfico (reservas por estado)
  graficoReservas: ChartData<'bar'> = { labels: [], datasets: [] };

  opcionesGrafico: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: {}, y: { beginAtZero: true } }
  };

  constructor(private api: ClienteApiService) {
    this.cargarDatos();
  }

  cargarDatos() {
    this.api.getReservas().subscribe((data: any) => {
      this.reservas = data;
      // actualizar gráfico si deseas
    });
  }

  toggleVista(tabla: boolean) {
    this.mostrarTabla = tabla;
  }
} 