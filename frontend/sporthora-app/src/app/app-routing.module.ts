// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./autenticacion-usuario/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home', // <--- Asegúrate de que esta ruta esté aquí
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'cliente-form',
    component: ClienteFormComponent
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario-inicio/usuario-inicio.module').then(m => m.UsuarioInicioModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente-inicio/cliente-inicio.module').then(m => m.ClienteInicioModule)
  },
  {
    path: 'cliente-reservas',
    loadChildren: () => import('./cliente/cliente-reservas/cliente-reservas.module').then(m => m.ClienteReservasModule)
  },
  {
    path: 'cliente-canchas',
    loadChildren: () => import('./cliente/cliente-canchas/cliente-canchas.module').then(m => m.ClienteCanchasModule)
  },
  {
    path: 'cliente-reportes',
    loadChildren: () => import('./cliente/cliente-reportes/cliente-reportes.module').then(m => m.ClienteReportesModule)
  },
  {
    path: 'cliente-pagos',
    loadChildren: () => import('./cliente/cliente-pagos/cliente-pagos.module').then(m => m.ClientePagosModule)
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, // Redirige a /auth/login por defecto
  // { path: '**', component: NotFoundComponent } // Opcional: para manejar rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }