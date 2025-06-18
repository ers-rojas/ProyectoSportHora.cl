import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';

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
  reservas: Reserva[] = [
    { usuario: 'Juan Pérez', fecha: '18/03/2025', hora: '18:00', cancha: 10, tipo: 'Fútbol', estado: 'Confirmada', duracion: '1h', precio: '$10.000', metodo: 'Webpay' },
    { usuario: 'Ana Gómez', fecha: '19/03/2025', hora: '16:30', cancha: 21, tipo: 'Padel', estado: 'Cancelada', duracion: '1h', precio: '$9.000', metodo: 'No Pagado' },
    { usuario: 'Luis Martínez', fecha: '20/03/2025', hora: '19:00', cancha: 25, tipo: 'Tenis', estado: 'Confirmada', duracion: '1h', precio: '$8.000', metodo: 'Efectivo' },
    { usuario: 'Sofía Herrera', fecha: '21/03/2025', hora: '20:00', cancha: 13, tipo: 'Básquetbol', estado: 'Pendiente', duracion: '1h', precio: '$7.000', metodo: 'Transferencia' },
    { usuario: 'Diego Torres', fecha: '21/03/2025', hora: '20:30', cancha: 11, tipo: 'Futbolito', estado: 'Confirmada', duracion: '1h', precio: '$10.000', metodo: 'Webpay' },
    { usuario: 'Carolina Rojas', fecha: '22/03/2025', hora: '18:15', cancha: 10, tipo: 'Fútbol', estado: 'Cancelada', duracion: '1h', precio: '$10.000', metodo: 'No Pagado' },
  ];

  // Datos de ejemplo para el gráfico (reservas por estado)
  graficoReservas: ChartData<'bar'> = {
    labels: ['Confirmadas', 'Pendientes', 'Canceladas'],
    datasets: [{ data: [3, 1, 2], backgroundColor: ['#4caf50', '#ffc107', '#d32f2f'] }]
  };

  opcionesGrafico: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: {}, y: { beginAtZero: true } }
  };

  toggleVista(tabla: boolean) {
    this.mostrarTabla = tabla;
  }
} 