import { Component, ViewChild, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { AlertController, IonSegment, IonSelect, IonSelectOption, LoadingController } from '@ionic/angular';
import { CodeCountry } from 'src/app/intefaces/interfaceCodeCountry';
import { Article } from 'src/app/intefaces/interfacesNoti';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit, AfterViewInit{

  @ViewChild(IonSegment) isegment: IonSegment;
  /* @ViewChild( IonSelect) iselectopt: IonSelect; */

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology',]
  noticiasByCategory: Article[] = [];
  codeCountry: CodeCountry[] = [];
  paisCodeBuscar: string;
  paisCodeDefault: string = '';
  constructor(
    private _sNoticias: NoticiasService,
    private _loading: LoadingController
  ) {
    //console.log(this.categorias);
    console.log('constructor');
    
    
  }

  ngOnInit(){
    console.log('ngoninit');
    
    
  }

  async ngAfterViewInit(){

    
    const alert = await this._loading.create({
      
      message: `Cargando noticias sobre ${ this.isegment.value }`,
      backdropDismiss: false,
      spinner: 'circular'
    })
    await alert.present();
    console.log("ngafterview");
    
    this.getSearchByCategory(this.isegment.value, alert )
    
  }

  async segmentChanged( evento: any){
    //console.log(evento);
    /* console.log('select a buscar: ', this.iselectopt.value);
    console.log('select default: ', this.iselectopt.value); */
    
    this.noticiasByCategory = [];
   const alert = await this._loading.create({
      message: `Cargando noticias sobre ${ this.isegment.value }`,
      backdropDismiss: false,
      spinner: 'circular'
    });
    
    await alert.present();
    console.log('segmentchange');
    
    this.getSearchByCategory(evento.detail.value, alert);

  }

  //sirve para cambiar las noticias del pais
  /* async cambiarPais( evento:any ){
    console.log("cambiar pais: " , evento.detail.value.toLowerCase());
    console.log("cambiar pais: " , this.isegment.value.toLowerCase());

    this.noticiasByCategory = [];
    const alert = await this._loading.create({
      message: `Cargando noticias sobre ${ this.isegment.value }`,
      backdropDismiss: false,
      spinner: 'circular'
    });

    await alert.present();
    console.log('cambiar pais seccion');
    
    this.getSearchByCategory( this.iselectopt.value.toLowerCase(), this.isegment.value, alert );
   
  } */


  /* getCodeCountry(){
    this._sNoticias.getCodeCountry()
    .subscribe( codeCountry => {
      //console.log(codeCountry);
      this.codeCountry = codeCountry;
      this.paisCodeDefault = codeCountry[0].alpha2Code;
      
    })
  } */

  //funcion para el infinite scroll
  loadData( evento:any ){
    console.log(evento);

    console.log('prueba', this.isegment.value);
    
    
    this._sNoticias.getSearchByCategory( this.isegment.value )
    .subscribe( m => {
      console.log(m);
      this.noticiasByCategory.push(...m.articles);
      evento.target.complete();
      
    });
  }
 

  //funcion para llamar al evento de buscar por categoria
  getSearchByCategory(evSegement?: string ,loading?: HTMLIonLoadingElement ){
    //this.paisCodeDefault = pais.toUpperCase();
    this.noticiasByCategory = [];
    this._sNoticias.getSearchByCategory(evSegement )
    .subscribe( m => {
      console.log(m);
      this.noticiasByCategory.push(...m.articles);
      loading.dismiss();
    });
  }


  

}
