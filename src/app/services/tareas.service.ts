import { Injectable } from '@angular/core';
import { Lista } from '../Models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  public listas: Lista[] = [];

  constructor() { 
    
    this.cargarStorage();
    
  }

  crearLista( titulo: string) {

    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();

    // devolvemos el id para poder tomarlo y hacer que la app abra la lista despues de creada.
    return nuevaLista.id;

  }

  obtenerLista( id: string | number ) {
    
    id = Number(id);

    return this.listas.find( listaData => listaData.id === id);

  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    
    if ( localStorage.getItem('data') ) {
      this.listas =  JSON.parse(localStorage.getItem('data'));
    } else {
      this.listas = [];
    }
   
  }


}
