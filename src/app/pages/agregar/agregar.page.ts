import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TareasService } from '../../services/tareas.service';
import { Lista } from '../../Models/lista.model';
import { ListaItem } from '../../Models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor( private tareaservice: TareasService,
               private route: ActivatedRoute) { 
    
    const listaId = this.route.snapshot.paramMap.get('listaId');

    this.lista = tareaservice.obtenerLista( listaId );

  };

  ngOnInit() {
  }

  agregarItem () {

    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem( this.nombreItem );
    this.lista.items.push( nuevoItem );
    this.tareaservice.guardarStorage();

    this.nombreItem = '';

  }

  cambioCheck( item: ListaItem ) {
    
    // cada vez que se cambien el estado del checkbox de una tarea, hay que verificar si todas las tareas estan terminadas
    // y así poder dar la lista de tareas por finalizada
    const pendientes = this.lista.items.filter( itemData => !itemData.completado ).length;

    if ( pendientes === 0 ) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.tareaservice.guardarStorage();
  }

  borrarItem( i: number ) {
    this.lista.items.splice(i, 1);
    this.tareaservice.guardarStorage();
  }
}
