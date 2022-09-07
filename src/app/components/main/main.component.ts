import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {BerryModel} from "../../models/berry.model";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  berries: BerryModel[] = []; //общий
  berry: any[] = [];          //частный
  berrySelectInfo: any;
  berrySelectName: string

  closeModal: string;

  constructor(private dataService: DataService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.dataService.getBerries()                 //общий запрос
      .subscribe((response: any) => {
        this.berries = response.results;
        this.berries.forEach((res) => {
           this.dataService.getMoreData(res.url)      //частный запрос
             .subscribe(response => {
               this.berry.push(response)
             })
        })
      })
  }
// получаем инфу выбранного элемента
  getBerryInfo(name: string) {
    this.berry.forEach( x => {
      if (x.name === name) {
        this.berrySelectInfo = x;
      }
    })
  }

  //******************* modal **************************  где-то взял

  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
