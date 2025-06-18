import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioInicioComponent } from './usuario-inicio.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: '', component: UsuarioInicioComponent },
  { path: 'reservas', loadChildren: () => import('../usuario-reservas/usuario-reservas.module').then(m => m.UsuarioReservasModule), canActivate: [AuthGuard] },
  { path: 'perfil', loadChildren: () => import('../usuario-perfil/usuario-perfil.module').then(m => m.UsuarioPerfilModule), canActivate: [AuthGuard] },
  { path: 'deporte', loadChildren: () => import('../usuario-deporte/usuario-deporte.module').then(m => m.UsuarioDeporteModule), canActivate: [AuthGuard] },
  { path: 'escoge-centro/:sport', loadChildren: () => import('../usuario-escoge-centro/usuario-escoge-centro.module').then(m => m.UsuarioEscogeCentroModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioInicioRoutingModule {} 