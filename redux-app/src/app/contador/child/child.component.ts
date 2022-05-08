import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styles: [
  ]
})
export class ChildComponent implements OnInit {
  @Input() count: number = 0;
  @Output() changeCount = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  multiplicar() {
    this.count *= 2;
    this.changeCount.emit(this.count);
  }

  dividir() {
    this.count /= 2;
    this.changeCount.emit(this.count);
  }

  restGrandChild($event: number) {
    this.count = $event;
    this.changeCount.emit(this.count);
  }
}
