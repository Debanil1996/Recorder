import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'gallery-cards',
  templateUrl: './gallery-cards.component.html',
  styleUrls: ['./gallery-cards.component.scss'],
})
export class GalleryCardsComponent implements OnInit {

  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {}

  openDetails(){
    
  }

}
