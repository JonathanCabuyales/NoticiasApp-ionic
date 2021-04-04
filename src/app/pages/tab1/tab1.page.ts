import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Article } from 'src/app/intefaces/interfacesNoti';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[] = [];

  constructor(
    private _service: NoticiasService,
    private _loading: LoadingController
  ) {}

  async ngOnInit(){
    const loading = await this._loading.create({
      message: "Cargando datos, espere por favor",
      spinner: 'circular',
      backdropDismiss: false
    });
    await loading.present();
    this._service.getTopHeadlings()
    .subscribe( m => {
      console.log(m);
      //this.noticias = m.articles;
      this.noticias.push( ...m.articles );
      loading.dismiss();
    });

  }

  loadData( ev:any ){
    
    console.log(ev);
    this.cargarData(ev);
    
  }
//funcion para cargar datos a traves del servicio
  cargarData( ev?:any ){
    this._service.getTopHeadlings()
    .subscribe( m => {
      console.log(m);
      //this.noticias = m.articles;
      if(ev.detail === null){
        ev.target.disabled = true;
        ev.target.complete();
        return;
      }
      this.noticias.push( ...m.articles );

      if( ev ){
        ev.target.complete();
      }


    });
  }

}
