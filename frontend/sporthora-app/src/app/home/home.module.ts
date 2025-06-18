// src/app/home/home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule si no está
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page.component';

// Importa CarouselModule para que este módulo reconozca el componente <carousel> y <slide>
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule, // Necesario para directivas comunes de Angular (ngIf, ngFor, etc.)
    HomeRoutingModule,
    CarouselModule // <-- Importa CarouselModule aquí (sin .forRoot() ni .forChild() ya que la configuración global se hizo en AppModule)
  ]
})
export class HomeModule { }