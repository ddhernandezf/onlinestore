import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modalwindow.component.html',
  styleUrls: ['./modalwindow.component.css']
})

export class ModalWindowComponent {
  @Input() Block: boolean;
  @Input() Title: String;
  @Output() CallAction = new EventEmitter<boolean>();

  constructor() {
  }

  Close() {
    this.Block = false;
    this.CallAction.emit(this.Block);
  }

}
