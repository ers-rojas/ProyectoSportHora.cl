import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-usuario-escoge-centro',
  templateUrl: './usuario-escoge-centro.component.html',
  styleUrls: ['./usuario-escoge-centro.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class UsuarioEscogeCentroComponent implements OnInit {
  sport = '';
  dateStr = '';
  time = '';

  // dummy centers
  centers = [
    { name: 'Centro Deportivo 1', location: 'Ciudad', image: '/assets/images/padel.webp' },
    { name: 'Centro Deportivo 2', location: 'Ciudad', image: '/assets/images/tenis.jpg' },
    { name: 'Centro Deportivo 3', location: 'Ciudad', image: '/assets/images/futbolito.jpg' }
  ];

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.sport = this.route.snapshot.paramMap.get('sport') || '';
    const dateParam = this.route.snapshot.paramMap.get('date') || '';
    this.time = this.route.snapshot.paramMap.get('time') || '';
    // Convert ISO yyyy-mm-dd to readable date (ej: lunes 17 de junio)
    if (dateParam) {
      const d = new Date(dateParam);
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
      this.dateStr = d.toLocaleDateString('es-ES', options);
    }
  }

  goBack(){
    this.location.back();
  }
} 