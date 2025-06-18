import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-usuario-inicio',
  templateUrl: './usuario-inicio.component.html',
  styleUrls: ['./usuario-inicio.component.scss'],
  standalone: false
})
export class UsuarioInicioComponent implements OnInit {
  constructor(private geo: GeolocationService) {}

  ngOnInit(): void {
    this.geo.requestLocation();
  }
} 