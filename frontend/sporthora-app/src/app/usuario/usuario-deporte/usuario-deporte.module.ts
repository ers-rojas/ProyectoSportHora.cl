import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioDeporteRoutingModule } from './usuario-deporte-routing.module';
import { UsuarioDeporteComponent } from './usuario-deporte.component';

@NgModule({
  imports: [CommonModule, RouterModule, UsuarioDeporteRoutingModule, UsuarioDeporteComponent]
})
export class UsuarioDeporteModule {} 