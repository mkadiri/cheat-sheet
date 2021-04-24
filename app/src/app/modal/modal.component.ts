import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
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

  get environmentVariables() {
    this._environmentVariables.inputs.forEach((element) => {
      var value = window.localStorage.getItem(this._environmentVariables.root + '.' + element.name);
      element.value = value;
    });

    return this._environmentVariables;
  }

  public save() {
    this._environmentVariables.inputs.forEach((element) => {
      var value = window.localStorage.getItem(this._environmentVariables.root + '.' + element.name);
      element.value = value;
    });
  }
}
