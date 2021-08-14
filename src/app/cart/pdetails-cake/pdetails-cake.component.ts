import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pdetails-cake',
  templateUrl: './pdetails-cake.component.html',
  styleUrls: ['./pdetails-cake.component.scss'],
})
export class PdetailsCakeComponent implements OnInit,OnChanges {
  @Input() cake;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.cake,changes);
  }

  ngOnInit() {
    console.log(this.cake);
  }

}
