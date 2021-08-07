import { TestBed } from '@angular/core/testing';

import { WebSpeechService } from './web-speech.service';

describe('WebSpeechService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebSpeechService = TestBed.get(WebSpeechService);
    expect(service).toBeTruthy();
  });
});
