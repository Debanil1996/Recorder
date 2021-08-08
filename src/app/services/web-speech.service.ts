import { Injectable, NgZone, Injector, EventEmitter } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import * as _ from 'lodash';
import { CommuicationService } from './commuication.service';
import { S } from '@angular/cdk/keycodes';
interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}
@Injectable({
  providedIn: 'root',
})
export class WebSpeechService {
  speechRecognition = null;
  channel;
  intervalForStartwakeWord;
  private wakeWord;
  inter;
  timer: NodeJS.Timer;

  webSpeechListener = new EventEmitter();
  sendor = new EventEmitter<any>();
  language: string;
  currentUser: any;

  constructor(
    private injector: Injector,
    private ngZone: NgZone,
  ) {
    
    console.log(this.currentUser?.preferred_language);
    this.language = this.currentUser?.preferred_language ? 'de-DE' : 'en-us';

    setTimeout(() => {
      this.wakeWord = this.injector.get(CommuicationService);
    }, 0);
  }
  public checkStream() {
    if (this.speechRecognition === null) {
      return false;
    } else if (this.speechRecognition) {
      return true;
    }
  }

  async record(component, chan, index, emmiter?) {
    if (index === 'index') {
      
    }
    this.inter = await this.wakeWord.stopAnnyang().then(() => {
      if (!this.checkStream()) {
        this.startSpeech(component, chan, index);
      } else {
      }
    });
  }

  givechannel(): Observable<any> {
    return of(this.channel);
  }
  startSpeech(component, channel, index) {
    this.channel = channel;
    let resulted = '';
    

    const { webkitSpeechRecognition }: IWindow = (window as unknown) as IWindow;
    this.speechRecognition = new webkitSpeechRecognition();
    this.speechRecognition.continuous = true;
    this.speechRecognition.lang = this.language;
    this.speechRecognition.maxAlternatives = 1;
    this.speechRecognition.interimResults = true;

    this.speechRecognition.onresult = (speech) => {
      this.timerToDestroy(component, channel, index);
      let term = '';
      if (speech.results) {
        const result = speech.results[speech.resultIndex];
        const transcript = result[0].transcript;
        if (result.isFinal) {
          if (result[0].confidence < 0.3) {
          } else {
            this.ngZone.run(() => {
              resulted = undefined;
              term = undefined;
              term = _.trim(transcript);
              resulted = term;
              if (this.speechRecognition) {
                
              }
            });
          }
        }
      }
    };
    this.speechRecognition.onerror = (event) => {
      this.ngZone.run(() => {
        this.DestroySpeechObject(component, channel, index);
      });
      this.speechRecognition = null;
    };
    this.speechRecognition.onend = () => {
      this.ngZone.run(() => {
        this.channel = undefined;
        this.speechRecognition = null;
        this.wakeWord.startAnnyang();
      });
    };
    this.speechRecognition.start();
    this.timerToDestroy(component, channel, index);
  }

  timerToDestroy(component, channel, index) {
    if (this.speechRecognition) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.DestroySpeechObject(component, channel, index);
      }, 10000);
    }
  }
  timerToDestroyCommon() {
    if (this.speechRecognition) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.DestroySpeechObjectCommon();
      }, 10000);
    }
  }

  DestroySpeechObjectCommon() {
    if (this.speechRecognition) {
      clearTimeout(this.timer);
      this.speechRecognition.stop();
      this.speechRecognition = null;
    }
    this.wakeWord.startAnnyang();

    this.sendor.emit(false);
  }
  DestroySpeechObject(component, channel, index) {
    if (this.speechRecognition) {
      clearTimeout(this.timer);
      this.speechRecognition.stop();
      this.channel = undefined;
      this.speechRecognition = null;
      this.wakeWord.startAnnyang();
    }
    

    if (index == 'index') {
      this.ngZone.run(() => {
        this.webSpeechListener.emit({ index: null, data: component });
      });
    }
  }

  webSpeechSStForAll() {
    let sst = '';
    return new Promise((resolve) => {
      const {
        webkitSpeechRecognition,
      }: IWindow = (window as unknown) as IWindow;
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.continuous = false;
      this.speechRecognition.lang = this.language;
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = (speech) => {
        let term = '';
        if (speech.results) {
          const result = speech.results[speech.resultIndex];
          const transcript = result[0].transcript;
          if (result.isFinal) {
            if (result[0].confidence < 0.3) {
            } else {
              term = '';
              term = _.trim(transcript);
              sst = term;
            }
          }
        }
      };
      this.speechRecognition.onerror = (event) => {
        this.speechRecognition = null;
        resolve(event);
      };
      this.speechRecognition.onend = () => {
        resolve(sst);
        this.speechRecognition = null;
      };
      this.speechRecognition.start();
    });
  }

  webSpeechSStWithContinuous() {
    let sendor = new EventEmitter<any>();

    let sst = '';
    const { webkitSpeechRecognition }: IWindow = (window as unknown) as IWindow;
    this.speechRecognition = new webkitSpeechRecognition();
    this.speechRecognition.continuous = true;
    this.speechRecognition.lang = this.language;
    this.speechRecognition.maxAlternatives = 1;

    this.speechRecognition.onresult = (speech) => {
      let term = '';
      if (speech.results) {
        const result = speech.results[speech.resultIndex];
        const transcript = result[0].transcript;
        if (result.isFinal) {
          if (result[0].confidence < 0.3) {
          } else {
            term = '';
            term = _.trim(transcript);
            sst = term;
            sendor.emit(sst);
          }
        }
      }
    };
    this.speechRecognition.onerror = (event) => {
      console.log(event);
      this.DestroySpeechObjectCommon();
      sendor.emit(false);
    };
    this.speechRecognition.onend = () => {
      this.DestroySpeechObjectCommon();
      sendor.emit(false);
    };
    this.wakeWord.stopAnnyang().then((element) => {
      this.speechRecognition.start();
    });

    return sendor;
  }

  webSpeechSStWithContinuousWithTimeout() {
    this.wakeWord.stopAnnyang();
    let sst = '';
    const { webkitSpeechRecognition }: IWindow = (window as unknown) as IWindow;
    this.speechRecognition = new webkitSpeechRecognition();
    this.speechRecognition.continuous = true;
    this.speechRecognition.lang = this.language;
    this.speechRecognition.maxAlternatives = 1;

    this.speechRecognition.onresult = (speech) => {
      this.timerToDestroyCommon();

      let term = '';
      if (speech.results) {
        const result = speech.results[speech.resultIndex];
        const transcript = result[0].transcript;
        if (result.isFinal) {
          if (result[0].confidence < 0.3) {
          } else {
            term = '';
            term = _.trim(transcript);
            sst = term;

            this.sendor.emit(sst);
          }
        }
      }
    };
    this.speechRecognition.onerror = (event) => {
      this.DestroySpeechObjectCommon();
    };
    this.speechRecognition.onend = () => {
      this.DestroySpeechObjectCommon();
    };
    this.speechRecognition.start();
    this.timerToDestroyCommon();

    return this.sendor;
  }

  stopsst() {
    this.speechRecognition.stop();
  }

  stopAnnyang() {
    this.wakeWord.stopAnnyang();
  }
  startAnnyang() {
    this.wakeWord.startAnnyang();
  }
}
