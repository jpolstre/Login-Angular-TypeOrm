import { UtilService } from './../../services/util.service';
import { AuthService } from '@app/pages/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private authSvc: AuthService, private utilsSvc: UtilService) {}

  ngOnInit(): void {}
  onExit() {
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false);
  }
}
