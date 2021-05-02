import { Component, OnInit, Input} from '@angular/core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-box',
  templateUrl: './code-box.component.html'
})
export class CodeBoxComponent implements OnInit {
  private _comment: string;
  private _comments: string[];
  private _code: string;
  private _environmentVariableRoot: string;
  private _elemId: string;
  private _faCopy: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this._elemId = Math.random().toString(36).substring(2, 15)
    this._faCopy = faCopy;
    this._environmentVariableRoot = 'environment-variable' + this.router.url;
  }

  get comments(): string[] {
    return this._comments;
  }

  @Input()
  set comments(value: string[]) {
    this._comments = value;
  }

  get environmentVariableRoot(): string {
    return this._environmentVariableRoot;
  }

  get comment(): string {
    return this._comment;
  }

  @Input()
  set comment(comment: string) {
    this._comment = comment;
  }

  get code(): string {
    return this._code;
  }

  @Input()
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

      if (key.startsWith(this._environmentVariableRoot)) {
        let pieces = key.split(/[\s/]+/);
        let envName = '$' + pieces[pieces.length - 1];
        let envName2 = '${' + pieces[pieces.length - 1] + '}';
        let value = window.localStorage.getItem(key);

        if (value) {
          out = out.replace(envName, window.localStorage.getItem(key));
          out = out.replace(envName2, window.localStorage.getItem(key));
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
