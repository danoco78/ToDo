import { Component, Input } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Lista } from '../../Models/lista.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  @Input() completadas = true;

  constructor( public tareasservice: TareasService,
               //private lista: Lista,
               private router: Router) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ) {

    if ( this.completadas === true ) {
      
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`)

    } else {

      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`)

    }

  }

  borrarLista( lista: Lista ) {
    this.tareasservice.borrarLista( lista );
  }

}
