import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioPerfilComponent } from './usuario-perfil.component';
import { UsuarioPerfilRoutingModule } from './usuario-perfil-routing.module';

@NgModule({
  declarations: [UsuarioPerfilComponent],
  imports: [CommonModule, UsuarioPerfilRoutingModule]
})
export class UsuarioPerfilModule {} 