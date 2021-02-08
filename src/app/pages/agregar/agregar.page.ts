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


}
