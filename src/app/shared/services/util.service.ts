import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class UtilService {
  private sidebarOpened = new BehaviorSubject<boolean>(false);
  //sidebarOpened$ necesario para modificar la propiedad sidebarOpened desde afuera cuando se inyecte esta clase en otra clase
  //para hacer un listen de la variable sidebarOpened asi :  this.utilssvc.sidebarOpened$.subscribe(....
  sidebarOpened$ = this.sidebarOpened.asObservable();
  openSidebar(value: boolean): void {
    this.sidebarOpened.next(value);
  }
}
