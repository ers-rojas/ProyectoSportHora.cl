import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioEscogeCentroComponent } from './usuario-escoge-centro.component';
import { UsuarioEscogeCentroRoutingModule } from './usuario-escoge-centro-routing.module';

@NgModule({
  imports: [CommonModule, RouterModule, UsuarioEscogeCentroRoutingModule, UsuarioEscogeCentroComponent]
})
export class UsuarioEscogeCentroModule {} 