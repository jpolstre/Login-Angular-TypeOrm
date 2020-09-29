import { UtilService } from './shared/services/util.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy  {
  opened = false;
  private destroy$ = new Subject<any>();

  constructor(private utilsSvc: UtilService) {}
  ngOnInit(): void {
    //escuchando cambios observable y tambien es otra forma de destruir el observable co takeuntil...
    this.utilsSvc.sidebarOpened$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => (this.opened = res));
  }
  ngOnDestroy(){
    this.destroy$.next({})
    this.destroy$.complete()//completado el observable
  }
}
