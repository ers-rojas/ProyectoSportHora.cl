import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioDeporteFiltrarComponent } from './usuario-deporte-filtrar.component';
import { UsuarioDeporteFiltrarRoutingModule } from './usuario-deporte-filtrar-routing.module';

@NgModule({
  imports: [CommonModule, RouterModule, UsuarioDeporteFiltrarRoutingModule, UsuarioDeporteFiltrarComponent],
})
export class UsuarioDeporteFiltrarModule {} 