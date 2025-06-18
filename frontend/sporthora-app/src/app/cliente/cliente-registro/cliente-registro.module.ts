import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteRegistroComponent } from './cliente-registro.component';
import { ClienteRegistroRoutingModule } from './cliente-registro-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ClienteRegistroRoutingModule,
    HttpClientModule,
    ClienteRegistroComponent
  ]
})
export class ClienteRegistroModule {} 