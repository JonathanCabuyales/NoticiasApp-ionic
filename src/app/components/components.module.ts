import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasCardComponent } from './noticias-card/noticias-card.component';
import { NoticiaContenComponent } from './noticia-conten/noticia-conten.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    NoticiasCardComponent,
    NoticiaContenComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    NoticiasCardComponent,
    NoticiaContenComponent
  ]
})
export class ComponentsModule { }
