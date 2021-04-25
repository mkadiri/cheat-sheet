import { Component, OnInit, Input} from '@angular/core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-code-box',
  templateUrl: './code-box.component.html'
})
export class CodeBoxComponent implements OnInit {
  private _comment: string;
  private _code: string;
  private _elemId: string;
  private _faCopy: any;

  ngOnInit(): void {
    this._elemId = Math.random().toString(36).substring(2, 15)
    this._faCopy = faCopy;
  }

  @Input()
  get comment(): string {
    return this._comment;
  }

  set comment(comment: string) {
    this._comment = comment;
  }

  @Input()
  get code(): string {
    return this._code;
  }

  set code(code: string) {
    this._code = code;
  }

  get elemId(): string {
    return this._elemId;
  }

  get faCopy(): string {
    return this._faCopy;
  }

  get codeOutput(): string {
    let out = this._code.replace(/^.*\n/g, "");

    for (let i = 0; i < window.localStorage.length; i++) {
      let key = window.localStorage.key(i);

      if (key.startsWith("environment-variable.kubectl.commands")) {
        let pieces = key.split(/[\s.]+/);
        let envName = '$' + pieces[pieces.length - 1];
        let value = window.localStorage.getItem(key);

        if (value) {
          out = out.replace(envName, window.localStorage.getItem(key));
        }
      }
    }

    return out
  }

  copyToClipboard() {
    let textarea = document.createElement("textarea");
    textarea.select();

    textarea.style.height = "0px";
    textarea.style.left = "-100px";
    textarea.style.opacity = "0";
    textarea.style.position = "fixed";
    textarea.style.top = "-100px";
    textarea.style.width = "0px";
    document.body.appendChild(textarea);

    let elem = document.getElementById(this.elemId)

    textarea.value = elem.innerText;
    textarea.select();

    let successful = document.execCommand("copy");

    if (!successful) {
      alert("browser won't allow copy")
    }

    if (textarea && textarea.parentNode) {
      textarea.parentNode.removeChild(textarea);
    }
  }
}
