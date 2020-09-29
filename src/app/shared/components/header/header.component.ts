import { AuthService } from '@app/pages/auth/auth.service';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  isAdmin = null;
  isLogged = false;
  // para emitir de hijo a padre( de abajo hacia arriba se usa Output, y de pade hacia hijo  - arriba hacia abajo se usaría @Input)

  //se crea el evento a emitir .
  @Output() toggeSidenav = new EventEmitter<void>();

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    //this.subscription.add(, solo es para poder des-suscribirce cuando el componente se destruya.
    this.subscription.add(
      this.authSrv.isLogged.subscribe((res) => (this.isLogged = res))
    );

    this.authSrv.isAdmin$.subscribe((res) => (this.isAdmin = res));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  // cuando se presiona el botón se ejecuta esta acción-método, el cual emite onToggleSidenav-evento hacia arriba al padre ( ya que es @output) - ES IGUAL QUE EN VUE
  onToggleSidenav(): void {
    this.toggeSidenav.emit();
  }

  onLogout() {
    this.authSrv.logout();
  }
}
