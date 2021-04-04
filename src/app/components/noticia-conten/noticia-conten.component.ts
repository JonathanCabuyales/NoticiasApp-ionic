import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../intefaces/interfacesNoti';

//esto sirve utilizando capacitor plugins
import { Browser, Share } from '@capacitor/core';


//esto sirve cuando se utiliza un proyecto con cpacitor instalando por cordova
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';


@Component({
  selector: 'app-noticia-conten',
  templateUrl: './noticia-conten.component.html',
  styleUrls: ['./noticia-conten.component.scss'],
})
export class NoticiaContenComponent implements OnInit {
  @Input() noticia: Article;
  @Input() banderaFav;

  @Input() i: number;

  cambiarTexto: string;

  constructor(
    private _iab: InAppBrowser,
    private _actionSheetCtrl: ActionSheetController,
    private _shared: SocialSharing,
    private _dataLocal: DataLocalService,
    private _toast: ToastController
  ) { }

  ngOnInit() {}

  abrirNoticia(){
    console.log("noticia ", this.noticia);

    const navegador = this._iab.create( this.noticia.url, '_system');
    
  }


  async lanzarMenu(){

    let cambiarFavorito;
    if(!this.banderaFav){
      cambiarFavorito = {
        text: 'Agregar a favoritos',
          icon: 'heart-outline',
          cssClass: 'action-dark | colorFav',
          handler: () => {
            console.log('save in favorites');
            this._dataLocal.guardarNoticias( this.noticia );
            this.mostrarMensjae('Agregado a favoritos');
          }
      }
    }else{
      cambiarFavorito = {
        text: 'Quitar de favoritos',
          icon: 'trash',
          cssClass: 'action-dark | colorFav',
          handler: () => {
            console.log('save in favorites');
            this._dataLocal.borrarNoticia( this.noticia );
            this.mostrarMensjae('Borrado de favoritos');
            //console.log(this._dataLocal.cargarFavoritos());
            
            
          }
      }
      
    }
    const action = await this._actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          cssClass: 'action-dark | colorShared',
          handler: () => {
            console.log("shared");
            this._shared.share(
              this.noticia.title,
              this.noticia.source.name,
              null,
              this.noticia.url
            );
          }
        },
        cambiarFavorito,
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'action-dark',
          icon: 'close-circle-outline',
          handler: () => {
            console.log('canceled');
            
          }
        }
      ]  
    });

    await action.present();

  }
  
  async mostrarMensjae( mensaje: string ){
    const toast = await this._toast.create({
      message: mensaje,
      position: 'bottom',
      duration: 1500
    });

    toast.present();
  }


}
