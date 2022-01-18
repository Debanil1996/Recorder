import { ErrorHandler, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {
  constructor(
    private alertCtrl:AlertController,
  ){}

  handleError(error: any): void {

  }
}
