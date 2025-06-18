import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

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
  lineReservas: ChartData<'line'> = {
    labels:['Enero','Febrero','Marzo','Abril','Mayo','Junio'],
    datasets:[{ data:[300,450,400,600,550,700], fill:false, borderColor:'#000', tension:0.4 }]
  };
  optionsLine: ChartConfiguration<'line'>['options'] = {responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}};

  // Gráfico de torta: estado de reservas
  pieLabels=['Confirmadas','Canceladas','Pendientes','Finalizadas'];
  pieValues=[7353,1292,511,124];
  pieData: ChartData<'pie', number[], string> = {
    labels:this.pieLabels,
    datasets:[{ data:this.pieValues, backgroundColor:['#4CAF50','#FF5252','#FFC107','#9E9E9E'] }]
  };
  pieOptions: ChartConfiguration<'pie'>['options'] = {
    responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}};

  // Métricas
  totalReservas=12042;
  reservasConfirmadas=9500;
  reservasCanceladas=2100;
  ingresosTotales=8750000;
  crecimientoMensual=12.5;

  // tabla de registros demo
  registros: Registro[] = [
    {fecha:'2024-06-01',nombre:'Juan Pérez',pago:'Webpay',detalle:'Cancha Fútbol 7 - Confirmada'},
    {fecha:'2024-06-02',nombre:'Ana Gómez',pago:'Transferencia',detalle:'Cancha Pádel - Cancelada'},
    {fecha:'2024-06-02',nombre:'Luis Martínez',pago:'Efectivo',detalle:'Cancha Tenis - Pendiente'},
    {fecha:'2024-06-03',nombre:'Sofía Herrera',pago:'Webpay',detalle:'Cancha Básquetbol - Confirmada'},
    {fecha:'2024-06-04',nombre:'Diego Torres',pago:'Webpay',detalle:'Cancha Básquetbol - Confirmada'},
    {fecha:'2024-06-05',nombre:'Carolina Rojas',pago:'Efectivo',detalle:'3 Bebidas Isotónicas'},
  ];

  mostrarTabla=true;

  toggleVista(t:boolean){this.mostrarTabla=t;}
} 