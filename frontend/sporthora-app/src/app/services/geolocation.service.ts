import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Coordinates {
  lat: number;
  lng: number;
  accuracy: number;
}

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  private coords$ = new BehaviorSubject<Coordinates | null>(null);
  private error$ = new BehaviorSubject<string | null>(null);

  /** Solicita la ubicación al usuario (si no se tiene aún) */
  requestLocation(): void {
    if (this.coords$.value) {
      return; // ya la tenemos
    }
    if (!navigator.geolocation) {
      this.error$.next('Tu navegador no soporta geolocalización.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.coords$.next({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => {
        const msg = err.code === err.PERMISSION_DENIED
          ? 'Permiso de ubicación denegado.'
          : 'No se pudo obtener la ubicación.';
        this.error$.next(msg);
      },
      { enableHighAccuracy: true, maximumAge: 300000, timeout: 10000 }
    );
  }

  getCoordinates(): Observable<Coordinates | null> {
    return this.coords$.asObservable();
  }

  getError(): Observable<string | null> {
    return this.error$.asObservable();
  }
} 