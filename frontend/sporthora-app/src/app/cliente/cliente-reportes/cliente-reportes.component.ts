import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { ClienteApiService } from '../services/cliente-api.service';

interface Registro {
  fecha: string;
  nombre: string;
  pago: string;
  detalle: string;
}

@Component({
  standalone:true,
  selector:'app-cliente-reportes',
  templateUrl:'./cliente-reportes.component.html',
  styleUrls:['./cliente-reportes.component.scss'],
  imports:[CommonModule, RouterModule, NgChartsModule]
})
export class ClienteReportesComponent {
  // Gráfico lineal reservas mensuales
  lineReservas: ChartData<'line'> = { labels: [], datasets: [] };
  optionsLine: ChartConfiguration<'line'>['options'] = {responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}};

  // Gráfico de torta: estado de reservas
  pieLabels=['Confirmadas','Canceladas','Pendientes','Finalizadas'];
  pieData: ChartData<'pie', number[], string> = { labels: [], datasets: [] };
  pieOptions: ChartConfiguration<'pie'>['options'] = {
    responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}};

  // Métricas
  totalReservas=0;
  reservasConfirmadas=0;
  reservasCanceladas=0;
  ingresosTotales=0;
  crecimientoMensual=0;

  // tabla de registros demo
  registros: Registro[] = [];

  mostrarTabla=true;

  toggleVista(t:boolean){this.mostrarTabla=t;}

  datosResumen:any[] = [];

  reservasMensuales: ChartData<'line'> = { labels: [], datasets: [] };

  ingresosMensuales: ChartData<'bar'> = { labels: [], datasets: [] };

  ocupacionPorDeporte: ChartData<'pie', number[], string> = { labels: [], datasets: [] };

  constructor(private api: ClienteApiService) {
    this.cargar();
  }

  private cargar(){
    this.api.getReportes().subscribe((data:any)=>{
      // asignar datos
    });
  }
} 