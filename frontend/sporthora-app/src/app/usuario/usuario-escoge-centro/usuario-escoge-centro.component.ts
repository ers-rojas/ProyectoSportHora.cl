import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { ClienteApiService } from '../../cliente/services/cliente-api.service';
import { GeolocationService } from '../../services/geolocation.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-usuario-escoge-centro',
  templateUrl: './usuario-escoge-centro.component.html',
  styleUrls: ['./usuario-escoge-centro.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class UsuarioEscogeCentroComponent implements OnInit {
  sport = '';
  dateStr = '';
  time = '';

  centers: any[] = [];
  hasExtern = false;
  searchTerm = '';
  comunas = ['Cerrillos','Cerro Navia','Conchalí','El Bosque','Estación Central','Huechuraba','Independencia','La Cisterna','La Florida','La Granja','La Pintana','La Reina','Las Condes','Lo Barnechea','Lo Espejo','Lo Prado','Macul','Maipú','Ñuñoa','Pedro Aguirre Cerda','Peñalolén','Providencia','Pudahuel','Puente Alto','Quilicura','Quinta Normal','Recoleta','Renca','San Joaquín','San Miguel','San Ramón','Santiago','Vitacura'];
  selectedComuna = '';

  /** Filtrados para la vista */
  get filteredCenters(){
    if(!this.searchTerm) return this.centers;
    const term=this.searchTerm.toLowerCase();
    return this.centers.filter(c=>c.nombre?.toLowerCase().includes(term));
  }

  recargarCercanos(){
    this.geo.reset();
    this.ngOnInit();
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private geo: GeolocationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.sport = this.route.snapshot.paramMap.get('sport') || '';
    const dateParam = this.route.snapshot.paramMap.get('date') || '';
    this.time = this.route.snapshot.paramMap.get('time') || '';
    // Convert ISO yyyy-mm-dd to readable date
    if (dateParam) {
      const d = new Date(dateParam);
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
      this.dateStr = d.toLocaleDateString('es-ES', options);
    }

    // Intentar geolocalización de inmediato
    this.geo.getCurrentCoords()
      .then(coords => {
        this.http.get<any>('/api/centros_deportivos/cercanos/', {
          params: {
            lat: coords.lat,
            lng: coords.lng,
            rad: '50000',
            sport: this.sport
          }
        }).subscribe({
          next: res => {
            const propios = res.propios || [];
            const externos = res.externos || [];
            this.centers = [...propios, ...externos];
            this.hasExtern = this.centers.some(c => c.externo);
          },
          error: err => console.error(err)
        });
      })
      .catch(() => {
        // Fallback a coordenadas de Plaza de Armas, Santiago
        const fallbackLat = -33.6150; // Puente Alto centro
        const fallbackLng = -70.5750;
        this.http.get<any>('/api/centros_deportivos/cercanos/', {
          params: { lat: fallbackLat, lng: fallbackLng, rad: '50000', sport: this.sport }
        }).subscribe(res => {
          const propios = res.propios || [];
          const externos = res.externos || [];
          this.centers = [...propios, ...externos];
          this.hasExtern = this.centers.some(c => c.externo);
        });
      });
  }

  goBack(){
    this.location.back();
  }

  buscarComuna(){
    if(!this.selectedComuna) return;
    const params:any={ sport:this.sport, comuna:this.selectedComuna };
    this.http.get<any>('/api/centros_deportivos/cercanos/',{params}).subscribe(res=>{
      const propios=res.propios||[];
      const externos=res.externos||[];
      this.centers=[...propios,...externos];
      this.hasExtern=this.centers.some(c=>c.externo);
    });
  }
} 