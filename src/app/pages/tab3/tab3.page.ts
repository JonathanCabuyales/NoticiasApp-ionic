import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Article } from '../../intefaces/interfacesNoti';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  noticiasLocal: Article[] = [];
  opt = {
    allowSlideNext: false,
    allowSlidePrev: false,

  }

  constructor(
    public _dataLocal: DataLocalService
  ) {} 
  
  ngOnInit(){
    console.log("ngOnInit", this._dataLocal.noticiasServicio);
  }

}
