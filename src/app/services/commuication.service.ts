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
        'I am your tasty bytes assistant help you'
      );
      msg.voice = this.selected;
      window.speechSynthesis.speak(msg);
    },
    'who created you': () => {
      const msg = new SpeechSynthesisUtterance(
        'I was single handedly created'
      );
      msg.voice = this.selected;
      window.speechSynthesis.speak(msg);
    },
    search: () => {
      this.zone.run(() => {
        this.hybridController.emit({ search: true });
      });
    },
    diagnosis: () => {
      this.zone.run(() => {
        this.hybridController.emit({ value: 'diagnosis', speech: true });
      });
    },
    drugs: () => {
      this.zone.run(() => {
        this.hybridController.emit({ value: 'drugs', speech: true });
      });
    },
    investigations: () => {
      this.zone.run(() => {
        this.hybridController.emit({ value: 'investigations', speech: true });
      });
    },
    'r o s': () => {
      this.zone.run(() => {
        this.hybridController.emit({ value: 'ros', speech: true });
      });
    },
    examination: () => {
      this.zone.run(() => {
        this.hybridController.emit({ value: 'examination', speech: true });
      });
    },
    allergy: () => {
      this.zone.run(() => {
        this.hybridController.emit({ value: 'allergy', speech: true });
      });
    },
    history: () => {
      this.zone.run(() => {
        this.hybridController.emit({ value: 'history', speech: true });
      });
    },
    procedure: () => {
      this.zone.run(() => {
        this.hybridController.emit({ value: 'procedure', speech: true });
      });
    },
    
    'what can you do': () => {
      const msg = new SpeechSynthesisUtterance(
        'showing all the available voice commands'
      );
      msg.voice = this.selected;
      window.speechSynthesis.speak(msg);
    },
    'show tasty bytes list': () => {
      this.zone.run(() => {
        this.patientList.emit('patientList');
      });
    },
    'show tasty bytes profile': () => {
    },
    'show customer list': () => {
  
      this.patientList.emit('doctorList');
    },
    'open invoice': () => {
      this.navBarOptions.emit('openBilling');
    },
    'open r x': () => {
      this.navBarOptions.emit('openRx');
    },
    'upload a document': () => {
      this.navBarOptions.emit('openUpload');
    },
    'add vitals': () => {
      this.navBarOptions.emit('openVitals');
    },
    'Change to dark mode': () => {
      this.navBarOptions.emit('onlyDarkMode');
    },
    'Change to white mode': () => {
      this.navBarOptions.emit('onlyWhiteMode');
    },
    'open email': () => {
      document.getElementById('email-href').click();
    },
    logout: () => {
      this.navBarOptions.emit('logout');
    },
    'next customer': () => {
      const msg = new SpeechSynthesisUtterance(
        'This command is a work in progress'
      );
      msg.voice = this.selected;
      window.speechSynthesis.speak(msg);
    },
    'Start encounter': () => {
      this.zone.run(() => {
        this.startAndSave.emit('start');
      });
    },
    'Save encounter': () => {
      this.zone.run(() => {
        this.startAndSave.emit('save');
      });
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
        console.log(transcript);
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
