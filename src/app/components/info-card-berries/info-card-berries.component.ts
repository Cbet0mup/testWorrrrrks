import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-info-card-berries',
  templateUrl: './info-card-berries.component.html',
  styleUrls: ['./info-card-berries.component.css']
})
export class InfoCardBerriesComponent{

  @Input()
  berryName?: string


}
