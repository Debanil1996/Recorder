import { CommuicationService } from './../services/commuication.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public focus="";
  public startSpeech:boolean=true;
  constructor(
    private navCtrl:NavController,
    private communication:CommuicationService
  ) {}
  ngOnInit(): void {
    this.communication.startAnnyang();
  }

  public toggleSpeech(){
    this.startSpeech=this.startSpeech? false:true;
    if(this.startSpeech){
      this.communication.startAnnyang();
    }else{
      this.communication.stopAnnyang();
    }
  }
  

  popup(){
    this.navCtrl.pop();
  }

  public changeGallery(value:string){
    console.log("Value got ",value);
    this.focus=value
  }

}
