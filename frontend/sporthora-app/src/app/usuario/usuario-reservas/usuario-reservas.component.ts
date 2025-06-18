import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario-reservas',
  templateUrl: './usuario-reservas.component.html',
  styleUrls: ['./usuario-reservas.component.scss'],
  standalone: false
})
export class UsuarioReservasComponent {
  mainTab: 'reservas' | 'partidos' = 'reservas';
  subTab: 'activas' | 'porPagar' | 'pasadas' = 'activas';

  selectMain(tab: 'reservas' | 'partidos') {
    this.mainTab = tab;
    // reset subtabs when cambia main
    this.subTab = 'activas';
  }

  selectSub(tab: 'activas' | 'porPagar' | 'pasadas') {
    this.subTab = tab;
  }

  months: string[] = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];
  years: number[] = [2025];

  selectedMonth: string = '';
  selectedYear: number | '' = '';
} 