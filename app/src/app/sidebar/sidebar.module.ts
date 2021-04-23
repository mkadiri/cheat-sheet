import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { ModalComponent } from '../modal/modal.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarComponent, ModalComponent ],
    exports: [ SidebarComponent ]
})


export class SidebarModule {}
