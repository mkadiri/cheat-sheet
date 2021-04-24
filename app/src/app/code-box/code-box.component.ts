import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-code-box',
  templateUrl: './code-box.component.html'
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
    code = code.replace(/^.*\n/g,"");

    var found = code.replace(/\\./g, '').match(/\$\w+/g);


    console.log(found)

    // code = code.replace(/\$\w+/g, '<span>asd</span>');
    // code = code.replace(/\$\w+/g, '<div [innerHTML]="foo"></div>');

    this._code = code;
  }

  // @Input()
  // get elemId(): string {
  //   return this._elemId;
  // }

  // set elemId(elemId: string) {
  //   this._elemId = elemId;
  // }

  elemId = Math.random().toString(36).substring(2, 15)

  copyToClipboard() {
    console.log(this.elemId)
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

    let elem = document.getElementById(this.elemId)

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
