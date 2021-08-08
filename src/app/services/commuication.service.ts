import { Injectable, NgZone, EventEmitter } from '@angular/core';
import { WebSpeechService } from './web-speech.service';
import * as annyang from 'src/app/utils/libs/annyang/annyang.min.js';


import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CommuicationService {
  commands = {
    hi: () => {
      const msg = new SpeechSynthesisUtterance(
        'Hi there, Mr ' + `${this.currentUser.first_name}`
      );
      msg.voice = this.selected;
      window.speechSynthesis.speak(msg);
    },
    'who are you': () => {
      const msg = new SpeechSynthesisUtterance(
        'I am your tasty bytes assistant help you and find the cakes you want'
      );
      msg.voice = this.selected;
      window.speechSynthesis.speak(msg);
    },
    'who created you': () => {
      const msg = new SpeechSynthesisUtterance(
        'I was created by Debanil for his customer debasmita'
      );
      msg.voice = this.selected;
      window.speechSynthesis.speak(msg);
    },
    'r o s': () => {
      this.zone.run(() => {
        this.hybridController.emit({ value: 'ros', speech: true });
      });
    },
    logout: () => {
      this.navBarOptions.emit('logout');
    },    
  };
  url: any;
  voices;
  selected;
  currentUser: any;
  mainTemp: string;
  minTemp: string;
  maxTemp: string;
  mainWeather: any;
  descriptionWeather: any;
  whateverSaid = new BehaviorSubject([]);
  patientList = new EventEmitter<any>();
  navBarOptions = new EventEmitter<any>();

  startAndSave = new EventEmitter<any>();
  hybridController = new EventEmitter<any>();
  annyyangSub: any;

  constructor(
    private webspeech: WebSpeechService,
    private zone:NgZone
  ) {
    this.startAnnyang();
    window.speechSynthesis.onvoiceschanged = () => {
      this.voices = window.speechSynthesis.getVoices();
      this.selected = this.voices.filter((element) => {
        return element.lang == 'hi-IN';
      })[0];
    };
    this.getWeather();
  }

  startAnnyang() {
    console.log('started');

    annyang.addCommands(this.commands);
    annyang.debug();
    annyang.start({ autoRestart: true, continuous: false });
    if (this.annyyangSub) {
      this.annyyangSub.unsubscribe();
    }
    this.annyyangSub = annyang.getEvent.subscribe((speech) => {
      if (speech.results) {
        const result = speech.results[speech.resultIndex];
        var indexOfMaxValue = Object.values(result)
          .map((el: any) => el.confidence)
          .reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);
        const transcript = result[indexOfMaxValue].transcript;
        console.log("Speech spoken : ",transcript);
        this.whateverSaid.next([...this.whateverSaid.value, ...[transcript]]);
      }
    });
  }

  public textToSpeech(message: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const msg = new SpeechSynthesisUtterance(message);
      msg.voice = this.selected;
      window.speechSynthesis.speak(msg);
      msg.onend = (event) => {
        this.zone.run(() => {
          resolve(true);
        });
      };
      msg.onerror = (event) => {
        this.zone.run(() => {
          resolve(false);
        });
      };
    });
  }

  public clearStoredAppointments() {
    this.whateverSaid.next([]);
  }

  public async stopAnnyang() {
    await annyang.abort();
    if (this.annyyangSub) {
      this.annyyangSub.unsubscribe();
    }
  }
  exportCommands() {
    return Object.keys(this.commands);
  }

  public get hybridControllerValue() {
    return this.hybridController;
  }

  getWeather() {
    // this.weather.getCurrentWeather(CITY).subscribe((res: any) => {
    //   this.mainTemp = (res.main.temp - 273.15).toString().slice(0, 2);
    //   this.mainWeather = res.weather[0].main;
    //   this.descriptionWeather = res.weather[0].description;
    // });
  }
}
