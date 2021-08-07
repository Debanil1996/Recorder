import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public focus="";
  constructor(
    private navCtrl:NavController
  ) {}
  

  popup(){
    this.navCtrl.pop();
  }

  public changeGallery(value:string){
    console.log("Value got ",value);
    this.focus=value
  }

}
