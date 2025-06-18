import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteInicioComponent } from './cliente-inicio.component';
import { ClienteInicioRoutingModule } from './cliente-inicio-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports:[CommonModule, RouterModule, ClienteInicioRoutingModule, ClienteInicioComponent]
})
export class ClienteInicioModule {} 