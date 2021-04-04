import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Article } from 'src/app/intefaces/interfacesNoti';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticiasServicio: Article[] = [];

  constructor(
    private _storage: Storage
  ) { 
    this.initDatabase();
    this.cargarFavoritos();
  }

   //funcion para crear la base de datos de favoritos
   async initDatabase(){
    const almacenamiento = await this._storage.create();
    this._storage = almacenamiento;
  }

  async guardarNoticias( noticias: Article){
    
    const existe = this.noticiasServicio.find( noti => noti.title === noticias.title );

    if( !existe ){
      this.noticiasServicio.unshift( noticias );
      await this._storage.set('FavNoticias', this.noticiasServicio );
      
    }


  }

  async cargarFavoritos(){
    const favoritos = await this._storage.get('FavNoticias');
    if( favoritos){
      
      this.noticiasServicio = favoritos;
    }
  
  }

  async borrarNoticia( noticia: Article){
    this.noticiasServicio = this.noticiasServicio.filter( m => m.title !== noticia.title);
    this._storage.set('FavNoticias', this.noticiasServicio );
  }
}
