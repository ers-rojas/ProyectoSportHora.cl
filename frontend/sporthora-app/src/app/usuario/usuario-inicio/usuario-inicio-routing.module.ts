import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioInicioComponent } from './usuario-inicio.component';

const routes: Routes = [
  { path: '', component: UsuarioInicioComponent },
  { path: 'reservas', loadChildren: () => import('../usuario-reservas/usuario-reservas.module').then(m => m.UsuarioReservasModule) },
  { path: 'perfil', loadChildren: () => import('../usuario-perfil/usuario-perfil.module').then(m => m.UsuarioPerfilModule) },
  { path: 'deporte', loadChildren: () => import('../usuario-deporte/usuario-deporte.module').then(m => m.UsuarioDeporteModule) },
  { path: 'deporte-filtrar/:sport', loadChildren: () => import('../usuario-deporte-filtrar/usuario-deporte-filtrar.module').then(m => m.UsuarioDeporteFiltrarModule) },
  { path: 'escoge-centro/:sport/:date/:time', loadChildren: () => import('../usuario-escoge-centro/usuario-escoge-centro.module').then(m => m.UsuarioEscogeCentroModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioInicioRoutingModule {} 