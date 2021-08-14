import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalController, NavController } from '@ionic/angular';
import { PdetailsCakeComponent } from 'src/app/cart/pdetails-cake/pdetails-cake.component';
import { CardsService } from './cards.service';

@Component({
  selector: 'gallery-cards',
  templateUrl: './gallery-cards.component.html',
  styleUrls: ['./gallery-cards.component.scss'],
})
export class GalleryCardsComponent implements OnInit {
  @Output() public openDetail=new EventEmitter<any>()
  cakes: Array<any>;
  constructor(
    private modalCtrl:ModalController,
    private navCtrl:NavController,
    private matDialog:MatDialog,
    private service:CardsService
  ) { }

  ngOnInit() {
    this.service.getValues().subscribe((res)=>{
      console.trace(res.data);
      this.cakes=res.data;
    })
  }
  async openDetails(cakegot){
    const dialog= await this.modalCtrl.create({
      component:PdetailsCakeComponent,
      componentProps:{
        cake : cakegot
      }
    });
    dialog.present();

    
  }

}
