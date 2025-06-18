import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { ClienteApiService } from '../../cliente/services/cliente-api.service';

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

  centers: any[] = [];

  constructor(private route: ActivatedRoute, private location: Location, private api: ClienteApiService) {}

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

    // Cargar centros disponibles desde el backend
    this.api.getCentrosDisponibles(this.sport, dateParam, this.time)
        .subscribe({
          next: (data: any) => {
            this.centers = data;
            if (!this.centers.length) {
              // Si no hay centros para el deporte/fecha, muestra todos los centros
              this.api.getCentrosDisponibles('', '', '').subscribe(all => this.centers = all);
            }
          },
          error: err => console.error('Error cargando centros', err)
        });
  }

  goBack(){
    this.location.back();
  }
} 