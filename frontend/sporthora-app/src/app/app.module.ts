// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- ¡Añadido!
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importaciones de ngx-bootstrap
import { CarouselModule } from 'ngx-bootstrap/carousel'; // <-- ¡Añadido!
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'; // <-- ¡Añadido!
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ClienteFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // <-- ¡Añadido a los imports!
    CarouselModule.forRoot(), // <-- ¡Añadido a los imports!
    BsDropdownModule.forRoot(), // <-- ¡Añadido a los imports!
    CollapseModule.forRoot(), // <-- ¡Añadido a los imports!
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }