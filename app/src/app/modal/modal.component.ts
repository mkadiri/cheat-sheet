import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  private _root: string;
  private _environmentVariables: string[];

  public visible = false;
  public visibleAnimate = false;
  public form: FormGroup;
  public formModelProps = [];
  public submitted: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const formModel = {};

    this._root = 'environment-variable' + this.router.url;

    this._environmentVariables.forEach((element) => {
      let value = window.localStorage.getItem(this._root + '/' + element)
        ? window.localStorage.getItem(this._root + '/' + element)
        :'';

      this.formModelProps.push(element);
      formModel[element] = new FormControl(value);
    });

    this.form = new FormGroup(formModel);
  }

  @Input()
  set environmentVariables(environmentVariables: string[]) {
    this._environmentVariables = environmentVariables;
  }

  get environmentVariables(): string[] {
    return this._environmentVariables;
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

  public submit() {
    this.submitted = true;

    Object.keys(this.form.controls).forEach(key => {
      window.localStorage.setItem(this._root + '/' + key, this.form.get(key).value);
    });
  }
}
