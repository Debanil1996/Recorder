import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    spaceBetween: 10,
    // Other options
    allowTouchMove: true,
  };
  constructor() {}

  ngOnInit() {}
}
