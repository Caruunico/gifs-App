import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http' //siempre importarlo PARA CUANDO CREO UN SERVICIO

import { SharedModule } from './shared/shared.module';
import { GifsModule } from './gifs/gifs.module';


import { AppComponent } from './app.component';




@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // tiene servicios que pueden usarse en el service.ts Y SE IMPORTA DESDE ANGULAR/COMMON
    SharedModule,
    GifsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
