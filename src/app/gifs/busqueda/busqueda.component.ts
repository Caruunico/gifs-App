import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {
//                                                                                                   tipado  ↓
  @ViewChild ('txtBuscar') txtBuscar!:/*El "!" se asegura de que el objeto no es nulo*/ElementRef<HTMLInputElement>; //El ViewChild obtiene informacion de referencias a objetos HTML

  // inyectamos el servicio gifs  para tener acceso a todas sus propiedades y metodos
  constructor(private gifsService: GifsService){}


  buscar(){

  

    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs(valor);
   

    this.txtBuscar.nativeElement.value = '';
  }
  
}
