import { Injectable } from '@angular/core';
import { Lista } from '../Models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  public listas: Lista[] = [];

  constructor() { 
    
    const lista1 = new Lista('recolectar priedras del infinito');
    const lista2 = new Lista('heroes a desaparecer');

    this.listas.push(lista1, lista2);
    
  }

  crearLista( titulo: string) {

    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);

  }

}
