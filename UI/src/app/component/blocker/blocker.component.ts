import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blocker',
  templateUrl: './blocker.component.html',
  styleUrls: ['./blocker.component.css']
})

export class BlockerComponent {

  @Input() Block: boolean;

  constructor() {
  }

}
