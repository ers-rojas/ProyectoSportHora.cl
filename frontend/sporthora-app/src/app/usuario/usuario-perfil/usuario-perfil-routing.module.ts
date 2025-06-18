import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioPerfilComponent } from './usuario-perfil.component';

const routes: Routes = [{ path: '', component: UsuarioPerfilComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioPerfilRoutingModule {} 