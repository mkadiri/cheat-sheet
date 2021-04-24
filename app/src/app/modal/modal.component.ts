import { Component, OnInit } from '@angular/core';
import { Hero } from '../shared/hero';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  // private _environmentVariables = {
  //   root: 'environment-variable.kubectl.commands',
  //   inputs: [
  //     {
  //       name: 'context',
  //       value: ''
  //     },
  //     {
  //       name: 'namespace',
  //       value: ''
  //     },
  //     {
  //       name: 'pod',
  //       value: ''
  //     }
  //   ]
  // };

  public visible = false;
  public visibleAnimate = false;

  model: Hero;
  heroForm: FormGroup;
  formModelProps = [];
  submitted: boolean;

  constructor() { }

  ngOnInit(): void {
    this.model = new Hero(18, 'Dr IQ', 'Really Smart', 'Chuck Overstreet', 'iq@superhero.com');

    const formModel = {};
    let validators = [ Validators.required ];
    for (const prop of Object.keys(this.model)) {
      if (prop.indexOf('email') !== -1) validators.push(ValidationService.emailValidator);
      formModel[prop] = new FormControl(this.model[prop], validators);
      this.formModelProps.push(prop);
    }
    this.heroForm = new FormGroup(formModel);
  }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  // get environmentVariables() {
  //   this._environmentVariables.inputs.forEach((element) => {
  //     var value = window.localStorage.getItem(this._environmentVariables.root + '.' + element.name);
  //     element.value = value;
  //   });
  //
  //   return this._environmentVariables;
  // }
  //
  // public save() {
  //   this._environmentVariables.inputs.forEach((element) => {
  //     var value = window.localStorage.getItem(this._environmentVariables.root + '.' + element.name);
  //     element.value = value;
  //   });
  // }

  submit() {
    this.submitted = true;
    alert('asdasd')
    console.log(this.heroForm)
  }
}
