import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  closeResult = '';
 


  cars = [
    {
      img: "assets/corolla.png",
      serial: "JHLRD77875C027456",
      model: "Corolla",
      year: "2020",
      license_plate: "RAL38K",
      time: "8:15am",
      order1: "reproductor",
      order2:"vidrio derecho"
    },
    {
      img: "assets/yaris.png",
      serial: "VIHRD19374C048203",
      model: "Yaris",
      year: "2018",
      license_plate: "RJA27C",
      time: "7:15am",
      order1: "reproductor",
      order2:"vidrio derecho"
    },
    {
      img: "assets/yaris.png",
      serial: "VIHRD19374C048203",
      model: "Yaris",
      year: "2018",
      license_plate: "RJA27C",
      time: "9:25am",
      order1: "reproductor",
      order2:"vidrio derecho"
    },
  ]

  constructor( private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
