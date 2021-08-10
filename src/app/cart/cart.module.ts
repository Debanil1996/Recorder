import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { PdetailsCakeComponent } from './pdetails-cake/pdetails-cake.component';
import { PaymentCakeComponent } from './payment-cake/payment-cake.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule
  ],
  declarations: [
    CartPage,
    PdetailsCakeComponent,
    PaymentCakeComponent
  ],
  entryComponents:[
    CartPage,
    PdetailsCakeComponent,
    PaymentCakeComponent
  ],
  exports:[
    CartPage,
    PdetailsCakeComponent,
    PaymentCakeComponent
  ]
})
export class CartPageModule {}
