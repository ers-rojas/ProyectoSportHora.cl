import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioInicioComponent } from './usuario-inicio.component';
import { UsuarioInicioRoutingModule } from './usuario-inicio-routing.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [UsuarioInicioComponent],
  imports: [CommonModule, UsuarioInicioRoutingModule, CarouselModule]
})
export class UsuarioInicioModule {} 