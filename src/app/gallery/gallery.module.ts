import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryPageRoutingModule } from './gallery-routing.module';

import { GalleryPage } from './gallery.page';
import { GalleryCardsComponent } from './gallery-cards/gallery-cards.component';
import { CartPageModule } from '../cart/cart.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule,
    CartPageModule
  ],
  declarations: [
    GalleryPage,
    GalleryCardsComponent
  ],
  // entryComponents:[
  //   GalleryPage,
  //   GalleryCardsComponent
  // ],
  providers:[]
})
export class GalleryPageModule {}
