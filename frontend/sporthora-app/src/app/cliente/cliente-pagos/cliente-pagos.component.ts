import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartData, ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

interface ResumenItem {
  descripcion: string;
  cantidad: string;
  detalle: string;
}

interface Pago {
  usuario: string;
  fecha: string;
  concepto: string;
  monto: string;
  metodo: string;
  estado: string;
}

@Component({
  standalone: true,
  selector: 'app-cliente-pagos',
  templateUrl: './cliente-pagos.component.html',
  styleUrls: ['./cliente-pagos.component.scss'],
  imports: [CommonModule, RouterModule, NgChartsModule]
})
export class ClientePagosComponent {
  mostrarTabla = true;
  mostrarOpciones = false;

  resumen: ResumenItem[] = [
    { descripcion: 'Ingresos Totales del Mes', cantidad: '$4.220.000 CLP', detalle: 'Período: marzo 2025' },
    { descripcion: 'Último Pago Recibido', cantidad: '$72.000 CLP', detalle: 'Fecha: 27/03/2025' },
    { descripcion: 'Reservas Pagadas (mes)', cantidad: '42', detalle: 'Mayor demanda: Fútbol 11' }
  ];

  pagos: Pago[] = [
    { usuario: 'Juan Pérez', fecha: '27/03/2025', concepto: 'Reserva Fútbol 11', monto: '$10.000', metodo: 'Webpay', estado: 'Pagado' },
    { usuario: 'Ana Gómez', fecha: '23/03/2025', concepto: 'Reserva Pádel', monto: '$9.000', metodo: 'Efectivo', estado: 'Pagado' },
    { usuario: 'Luis Martínez', fecha: '22/03/2025', concepto: 'Reserva Tenis', monto: '$8.000', metodo: 'Transferencia', estado: 'No Pagado' },
    { usuario: 'Sofía Herrera', fecha: '21/03/2025', concepto: 'Reserva Básquetbol', monto: '$7.000', metodo: 'Webpay', estado: 'Pagado' },
    { usuario: 'Diego Torres', fecha: '20/03/2025', concepto: 'Reserva Fútbol 11', monto: '$10.000', metodo: 'Webpay', estado: 'Pagado' }
  ];

  // 1) Ingresos semanales (línea)
  ingresosSemanales: ChartData<'line'> = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        data: [280000, 190000, 210000, 320000],
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63,81,181,0.1)',
        fill: true,
        tension: 0.3
      }
    ]
  };

  // 2) Métodos de pago (torta)
  metodosPago: ChartData<'pie', number[], string> = {
    labels: ['Webpay 40%', 'Efectivo 25%', 'Transferencia 20%', 'Onepay 15%'],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: ['#4caf50', '#ffeb3b', '#03a9f4', '#9e9e9e']
      }
    ]
  };

  // 3) Promedio ingreso por reserva (línea)
  promedioIngresoReserva: ChartData<'line'> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'],
    datasets: [
      {
        data: [8000, 9000, 8500, 8800, 9200, 10000, 10500, 11000, 10800, 11200],
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255,152,0,0.1)',
        fill: true,
        tension: 0.3
      }
    ]
  };

  // 4) Crecimiento ingresos por mes (línea)
  crecimientoIngresosMes: ChartData<'line'> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'],
    datasets: [
      {
        data: [500000, 650000, 600000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000],
        borderColor: '#009688',
        backgroundColor: 'rgba(0,150,136,0.1)',
        fill: true,
        tension: 0.3
      }
    ]
  };

  opcionesLineas: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: {}, y: { beginAtZero: true } }
  };

  opcionesPie: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right' } }
  };

  toggleVista(tabla: boolean) {
    this.mostrarTabla = tabla;
  }

  toggleOpciones() {
    this.mostrarOpciones = !this.mostrarOpciones;
  }
} 