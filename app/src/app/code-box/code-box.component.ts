import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-code-box',
  templateUrl: './code-box.component.html',
  // encapsulation: ViewEncapsulation.None
})
export class CodeBoxComponent implements OnInit {
  private _comment: string;
  private _code: string;
  private _elemId: string;

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

  @Input()
  get elemId(): string {
    return this._elemId;
  }

  set elemId(elemId: string) {
    this._elemId = elemId;
  }

  // elemId = Math.floor((Math.random()*6)+1);

  copyToClipboard(inputTarget: string) {
    let textarea = null;
    textarea = document.createElement("textarea");
    textarea.value = "asdsd";
    textarea.select();

    textarea.style.height = "0px";
    textarea.style.left = "-100px";
    textarea.style.opacity = "0";
    textarea.style.position = "fixed";
    textarea.style.top = "-100px";
    textarea.style.width = "0px";
    document.body.appendChild(textarea);
    // Set and select the value (creating an active Selection range).

    let elem = document.getElementById(inputTarget)

    textarea.value = elem.innerText;
    textarea.select();

    // Ask the browser to copy the current selection to the clipboard.
    let successful = document.execCommand("copy");
    if (successful) {

    } else {
      alert("browser won't allow copy")
    }

    if (textarea && textarea.parentNode) {
      textarea.parentNode.removeChild(textarea);
    }
  }

  faCopy = faCopy;

  ngOnInit(): void {
  }
}
