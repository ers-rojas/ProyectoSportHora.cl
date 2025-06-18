import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-usuario-deporte-filtrar',
  templateUrl: './usuario-deporte-filtrar.component.html',
  styleUrls: ['./usuario-deporte-filtrar.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class UsuarioDeporteFiltrarComponent implements OnInit {
  sport: string = '';
  currentMonthLabel: string = '';
  days: { date: Date; label: string }[] = [];
  selectedDayIndex: number = 0;
  timeSlots: string[] = [];
  selectedTime?: string;

  private today: Date = new Date();
  private startDate: Date = new Date(); // primer día mostrado

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.sport = this.route.snapshot.paramMap.get('sport') || '';
    this.generateDays();
    this.generateTimes();
  }

  private generateDays(): void {
    // Asegurar que startDate nunca sea antes de hoy
    if (this.startDate < this.today) {
      this.startDate = new Date(this.today);
    }

    // Limitar startDate para que no se pase del fin de mes
    const lastDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    if (this.startDate > lastDayOfMonth) {
      this.startDate = new Date(lastDayOfMonth);
    }

    const monthNames = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
    this.currentMonthLabel = monthNames[this.today.getMonth()];

    this.days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(this.startDate);
      d.setDate(this.startDate.getDate() + i);
      if (d.getMonth() !== this.today.getMonth() || d > lastDayOfMonth) break; // no pasar de mes
      const dayLabel = d.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase().replace('.', '');
      this.days.push({ date: d, label: dayLabel });
    }

    // reajustar selectedDayIndex si quedó fuera de rango
    if (this.selectedDayIndex >= this.days.length) {
      this.selectedDayIndex = 0;
    }
  }

  prevWeek() {
    const candidate = new Date(this.startDate);
    candidate.setDate(candidate.getDate() - 7);
    // No retroceder antes de hoy
    if (candidate < this.today) {
      this.startDate = new Date(this.today);
    } else {
      this.startDate = candidate;
    }
    this.generateDays();
  }

  nextWeek() {
    const candidate = new Date(this.startDate);
    candidate.setDate(candidate.getDate() + 7);
    const lastDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    // No avanzar más allá del último día del mes
    if (candidate > lastDayOfMonth) {
      this.startDate = this.startDate; // sin cambios
    } else {
      this.startDate = candidate;
    }
    this.generateDays();
  }

  selectDay(index: number){
    this.selectedDayIndex = index;
  }

  private generateTimes(){
    const times: string[] = [];
    let hour = 7;
    let minute = 0;
    while(hour < 22 || (hour === 22 && minute <= 30)){
      const label = `${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}`;
      times.push(label);
      minute += 30;
      if(minute==60){minute=0;hour++;}
    }
    this.timeSlots = times;
  }

  selectTime(t: string){
    this.selectedTime = t;
  }

  goNext(){
    if(!this.selectedTime) return;
    const selectedDate = this.days[this.selectedDayIndex].date;
    const dateStr = selectedDate.toISOString().split('T')[0];
    this.router.navigate(['/usuario/escoge-centro', this.sport, dateStr, this.selectedTime]);
  }

  goBack(){
    this.location.back();
  }
} 