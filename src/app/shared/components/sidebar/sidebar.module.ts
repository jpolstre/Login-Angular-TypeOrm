import { UtilService } from './../../services/util.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';

import { MaterialModule } from '@app/materila.module';

@NgModule({
  declarations: [SidebarComponent], //n g m shared/components/sidebar -m=sidebar
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [SidebarComponent], //hay que exponer el componente para que otros módulos lo puedan utilizar.

  providers:[UtilService]
})
export class SidebarModule {}
