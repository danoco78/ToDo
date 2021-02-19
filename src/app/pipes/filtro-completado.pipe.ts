import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../Models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform( listas: Lista[], completadas: boolean = true): Lista[] {
    
    return listas.filter( lista => lista.terminada === completadas);
    
  }

}
