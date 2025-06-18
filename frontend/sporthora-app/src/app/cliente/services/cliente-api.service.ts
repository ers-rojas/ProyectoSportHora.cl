import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteApiService {
  constructor(private http: HttpClient) {}

  // Dashboard vacío: implementaremos los endpoints reales en siguiente etapa
  getDashboard(): Observable<any> {
    return this.http.get('/api/cliente/dashboard/');
  }

  // Placeholder para futuras llamadas
  getReservas(): Observable<any> { return this.http.get('/api/cliente/reservas/'); }
  getCanchas(): Observable<any> { return this.http.get('/api/cliente/canchas/'); }
  getPagos(): Observable<any> { return this.http.get('/api/cliente/pagos/'); }
  getReportes(): Observable<any> { return this.http.get('/api/cliente/reportes/'); }

  /* --- Centro Deportivos --- */
  getCentros(): Observable<any> { return this.http.get('/api/centros_deportivos/'); }
  createCentro(data: any): Observable<any> { return this.http.post('/api/centros_deportivos/', data); }
  updateCentro(id: number, data: any): Observable<any> { return this.http.put(`/api/centros_deportivos/${id}/`, data); }
  deleteCentro(id: number): Observable<any> { return this.http.delete(`/api/centros_deportivos/${id}/`); }

  /* --- Centros Disponibles para usuario --- */
  getCentrosDisponibles(sport: string, date: string, time: string): Observable<any> {
    return this.http.get('/api/centros_deportivos/disponibles/', {
      params: { sport, date, time }
    });
  }
} 