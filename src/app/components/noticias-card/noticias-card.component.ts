import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/intefaces/interfacesNoti';

@Component({
  selector: 'app-noticias-card',
  templateUrl: './noticias-card.component.html',
  styleUrls: ['./noticias-card.component.scss'],
})
export class NoticiasCardComponent implements OnInit {

  @Input() noticias: Article[] = [];
  @Input() banderaFav = false;

  constructor() { }

  ngOnInit() {}

}
