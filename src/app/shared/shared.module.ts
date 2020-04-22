import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  // Se exporta porque uno de sus componentes tiene 
  // un componente que se utiliza fuera de la carpeta
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent]
})
export class SharedModule { }
