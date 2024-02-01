import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel.component';
import { IonicModule } from '@ionic/angular';


const routes: Routes = [{path:'',component:CarouselComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes),IonicModule],
  exports: [RouterModule]
})
export class CarouselRoutingModule { }
