import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioReservasComponent } from './usuario-reservas.component';
import { UsuarioReservasRoutingModule } from './usuario-reservas-routing.module';

@NgModule({
  declarations: [UsuarioReservasComponent],
  imports: [CommonModule, FormsModule, UsuarioReservasRoutingModule]
})
export class UsuarioReservasModule {} 