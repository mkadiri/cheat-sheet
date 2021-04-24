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
  private _codeOutput: string;

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

  get codeOutput(): string {
    return this._codeOutput
  }

  set code(code: string) {
    this._code = code;

    this._codeOutput = code.replace(/^.*\n/g,"");

    for (var i = 0; i < window.localStorage.length; i++) {
      var key = window.localStorage.key(i);
      console.log(key);
      if (key.startsWith("environment-variable.kubectl.commands")) {
        var pieces = key.split(/[\s.]+/);
        var envName = '$' + pieces[pieces.length-1];

        this._codeOutput = this._codeOutput.replace(envName, window.localStorage.getItem(key));

        // console.log(window.localStorage.getItem(key));

        // results.push(JSON.parse(window.localStorage.getItem(key)));
      }
    }

    // var matches = code.match(/\$\w+/g);
    // var envVars = {
    //   'context': 'aws1-live-eks',
    //   'namespace': 'production'
    // }

    // if (envVars) {
    //   envVars.forEach((element) => {
    //     console.log('elem: ' + element);
    //   });
    // }

    // if (matches) {
    //   matches.forEach((element) => {
    //     console.log('elem: ' + element);
    //   });
    // }

    // code.replace(/\\./g, '').match(/\$\w+/g).forEach((element) => {
    //   console.log('elem: ' + element);
    // });
    // console.log(found)
  }

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
