import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lista } from '../../Models/lista.model';
import { TareasService } from '../../services/tareas.service'


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  constructor( public tareasservice: TareasService,
               //private lista: Lista,
               private router: Router) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ) {
    
    this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`)

  }

}
