import { Component, Input, ViewChild } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Lista } from '../../Models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  // el @ViewChild me permite desde TS hacer referencia a un lemento html y manipularlo.
  // en este caso lo hacemos para cerrar el item sliding cuando editamos el nombre de la lista 
  // porque actualmente se esta quedando deslizado cuando hemos dado al boton actualizar y el alert se cierra.
  // al final de la función editarLista esta el uso de este elemento.
  @ViewChild( IonList ) listaHtml: IonList;
  @Input() completadas = true;

  constructor( public tareasservice: TareasService,
               private alertctrl: AlertController,
               private router: Router) { }

   listaSeleccionada( lista: Lista ) {

    if ( this.completadas === true ) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`)
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`)
    }

  }

  async editarLista( lista: Lista ) {

    const alert = await this.alertctrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,  // esta propiedad permite cargar valores por defecto a la alerta
          // placeholder: "Nombre de la lista"
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.listaHtml.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            console.log(data);
            if (data.titulo.length === 0) {
              this.listaHtml.closeSlidingItems();
              return;
            }
            lista.titulo = data.titulo;
            this.tareasservice.guardarStorage();
            this.listaHtml.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }

  borrarLista( lista: Lista ) {
    this.tareasservice.borrarLista( lista );
  }

}
