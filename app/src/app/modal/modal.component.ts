import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  private _environmentVariables = {
    root: 'environment-variable.kubectl.commands',
    inputs: [
      {
        name: 'context',
        value: ''
      },
      {
        name: 'namespace',
        value: ''
      },
      {
        name: 'pod',
        value: ''
      }
    ]
  };

  public visible = false;
  public visibleAnimate = false;

  form: FormGroup;
  formModelProps = [];
  submitted: boolean;
  root: string;

  constructor() { }

  ngOnInit(): void {
    const formModel = {};

    this._environmentVariables.inputs.forEach((element) => {
      let value = window.localStorage.getItem(this._environmentVariables.root + '.' + element.name)
        ? window.localStorage.getItem(this._environmentVariables.root + '.' + element.name)
        :'';

      this.formModelProps.push(element.name);
      formModel[element.name] = new FormControl(value);
    });

    this.form = new FormGroup(formModel);
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

  submit() {
    this.submitted = true;

    Object.keys(this.form.controls).forEach(key => {
      window.localStorage.setItem(this._environmentVariables.root + '.' + key, this.form.get(key).value);
    });

    console.log(this.form)
    this.visibleAnimate = false;
  }
}
