import { Component, Input } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Lista } from '../../Models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  @Input() completadas = true;

  constructor( public tareasservice: TareasService,
               private alertctrl: AlertController,
               private router: Router) { }

  ngOnInit() {}

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
          value: lista.titulo,  //esta propiedad permite cargar valores por defecto a la alerta
          //placeholder: "Nombre de la lista"
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelar");
          }
        },
        {
          text: 'Guardar',
          handler: ( data ) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }

            //const listaId = this.tareasservice.editarLista(data.titulo);
            this.editarLista( lista, data.titulo )
            return;
            //this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
            
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
