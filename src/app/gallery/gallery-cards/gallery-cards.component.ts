import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalController, NavController } from '@ionic/angular';
import { PdetailsCakeComponent } from 'src/app/cart/pdetails-cake/pdetails-cake.component';

@Component({
  selector: 'gallery-cards',
  templateUrl: './gallery-cards.component.html',
  styleUrls: ['./gallery-cards.component.scss'],
})
export class GalleryCardsComponent implements OnInit {
  @Output() public openDetail=new EventEmitter<any>()
  constructor(
    private modalCtrl:ModalController,
    private navCtrl:NavController,
    private matDialog:MatDialog
  ) { }

  ngOnInit() {}
  async openDetails(){
    const dialog= await this.modalCtrl.create({
      component:PdetailsCakeComponent
    });
    dialog.present();

    
  }

}
