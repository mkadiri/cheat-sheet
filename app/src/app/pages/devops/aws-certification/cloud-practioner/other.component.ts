import {Component} from '@angular/core';

// Dynamically added components
@Component({
  selector: 'app-one-component',
  template: `<div class="card">
    <div class="card-header">
      <span class="card-title">{{title}}</span>
    </div>
    <div class="card-body">
      {{body}}
    </div>
  </div>`
})
export class OneComponent {
  title = 'hi';
  body = '';
}

@Component({
  selector: 'app-two-component',
  template: `<h2>c22</h2>`

})
export class TwoComponent {
}

@Component({
  selector: 'app-three-component',
  template: `<h2>c3</h2>`

})
export class ThreeComponent {
}
