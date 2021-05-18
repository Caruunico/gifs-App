import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent  {

  constructor(private gifsService: GifsService){//inyecto servicio
  }

  get historial(){//retorna al arreglo historial del servicio
    return this.gifsService.historial;
  
  }

  buscar(termino: string){//funcion en el htm sidebar
    console.log(termino);
    this.gifsService.buscarGifs(termino); //le paso como paramtro el termino que seria el item del ngFor a la funcion en el servicio
  }
}
