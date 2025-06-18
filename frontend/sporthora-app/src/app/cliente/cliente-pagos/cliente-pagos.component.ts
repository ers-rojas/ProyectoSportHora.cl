import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartData, ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ClienteApiService } from '../services/cliente-api.service';

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

  resumen: ResumenItem[] = [];

  pagos: Pago[] = [];

  // 1) Ingresos semanales (línea)
  ingresosSemanales: ChartData<'line'> = { labels: [], datasets: [] };

  // 2) Métodos de pago (torta)
  metodosPago: ChartData<'pie', number[], string> = { labels: [], datasets: [] };

  // 3) Promedio ingreso por reserva (línea)
  promedioIngresoReserva: ChartData<'line'> = { labels: [], datasets: [] };

  // 4) Crecimiento ingresos por mes (línea)
  crecimientoIngresosMes: ChartData<'line'> = { labels: [], datasets: [] };

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

  constructor(private api: ClienteApiService) {
    this.cargar();
  }

  private cargar() {
    this.api.getPagos().subscribe((data:any)=>{
      this.pagos = data;
    });
  }

  toggleVista(tabla: boolean) {
    this.mostrarTabla = tabla;
  }

  toggleOpciones() {
    this.mostrarOpciones = !this.mostrarOpciones;
  }
} 