import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponsive, Gif } from '../interface/gifs.interface';//interfaz de la respuesta HTTP

@Injectable({
  providedIn: 'root' //lo eleva a un nivel global en la aplicacion y no hace falta declararlo en el module
})
export class GifsService {

  private apiKey: string= '6cCvhw6H2mqCrP68FaNnKk09RS0IUhJI';//uso de la API
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  

    // codigo para agregar lo que buscamos en el historial

  private _historial: string[] = [];
  
  public resultados: Gif[] = [];// guardo la resp.data  de la peticion HTTP en un array vacio
  

  get historial(){
    return [...this._historial];//  " ..._historial" hace una 'copia' del array
    }

  constructor(private http: HttpClient){ // con esta linea de codigo ya puedo hacer peticiones http necesaria para usar la API

    if(localStorage.getItem('historial')){//muestra el hsitorial al recargar la pagina
      this._historial = JSON.parse( localStorage.getItem('historial')!);
    }
    if(localStorage.getItem('resultados')){//muestra el resultado al recargar la pagina
      this.resultados = JSON.parse( localStorage.getItem('resultados')!);
    }

  }

  buscarGifs(termino: string){

    termino = termino.trim().toLocaleLowerCase();// retorna la cadena de texto desde la que se llama convertida en minúsculas, de acuerdo con cualquier localización específica de correspondencia de mayúsculas y minúsculas.

    if( !this._historial.includes(termino)){//includes: si existe o si incluye lo que yo quier agregar al array


      this._historial.unshift(termino);//el unShift agrega al principio del arreglo al parametro pasado por la funcion
      // es como el push, pero en vez de insertarlo al final, lo inserta al principio

      this._historial = this._historial.splice(0,10);//el splice muestra los elementos del array historial desde el 0 al 10

      localStorage.setItem('historial', JSON.stringify(this._historial));//el setItem solo recibe String y para guardar el historial necesito convertir el this._historial a string con JSON.Stringify
    }

    const params = new HttpParams()// parametros de la peticion http de mas abajo
                .set('api_key', this.apiKey)
                .set('limit', '10')
                .set('q', termino );

    console.log(params.toString());

    //Peticiones HTTP que retornan observables
    this.http.get<SearchGifsResponsive>(`${ this.servicioUrl }/search?`, { params })
    .subscribe( (resp) =>{ // el suscribe se ejecuta cuando tenemos una la resolucion de ese get
      console.log(resp.data);//solo quiero la data 
      this.resultados = resp.data ;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
    
    
    
    
    
    // console.log(this._historial);
    }
  }

  //hay que inyectar este servicio en el busqueda cmponente que tiene el valor del dato.

