import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-better',
  template: `
  <h2>Better</h2>
  <div *ngFor="let tab of tabs">
    <app-dcl-wrapper [type]="tab"></app-dcl-wrapper>
  </div>
`
})
export class BetterComponent {
  @Input() tabs;
}
