import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-grandchild',
  templateUrl: './grandchild.component.html',
  styles: [
  ]
})
export class GrandchildComponent implements OnInit {
  @Input() count: number = 0;
  @Output() changeCount = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }

  reset() {
    this.count = 0;
    this.changeCount.emit(this.count);
  }

}
