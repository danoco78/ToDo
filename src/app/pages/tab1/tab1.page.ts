import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TareasService } from '../../services/tareas.service';
// import { Lista } from '../../Models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public tareasservice: TareasService,
               private router: Router,
               private alertctrl: AlertController) {}

  async agregarLista() {
    
    const alert = await this.alertctrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: "Nombre de la lista"
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
          text: 'Crear',
          handler: ( data ) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }

            const listaId = this.tareasservice.crearLista(data.titulo);

            this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
            
          }
        }
      ]
    });

    alert.present();
  }


}
