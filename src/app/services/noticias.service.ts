import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadlines } from '../intefaces/interfacesNoti';
import { CodeCountry } from '../intefaces/interfaceCodeCountry';



@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
;
  private baseUrl: string ='https://newsapi.org/v2/';
  pageHeadlines = 0;
  categoriaActual = '';
  categoriaPage = 0;
  

  private headers = new HttpHeaders({
    'X-Api-Key': `${ environment.apiKey }`
  });

  constructor(
    private _http: HttpClient
  ) { }

  getTopHeadlings(){
    this.pageHeadlines++;
    /* const params = {
      'q':'general',
      'page': this.pageHeadlines.toString()
    } */
    const params = new HttpParams()
    .set('country', 'us')
    .set('category', 'business')
    return this._http.get<RespuestaTopHeadlines>(`${ this.baseUrl }top-headlines`, { params , headers: this.headers },);
  }

  getSearchByCategory(categoria: string ){
    
    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    
    const params = new HttpParams()
    .set('country', 'us')
    .set('category', categoria)
    .set('page', this.categoriaPage.toString())

    return this._http.get<RespuestaTopHeadlines>(`${ this.baseUrl }top-headlines`, { params, headers:this.headers });
  }

  /* getCodeCountry(){
    return this._http.get<CodeCountry[]>('https://restcountries.eu/rest/v2/all?fields=alpha2Code;name');
  } */
}
