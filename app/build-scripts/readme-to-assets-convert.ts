const fs = require('fs');

function formatSection(file: string, sectionBreakCounter: number): string {
  if (sectionBreakCounter === 1) {
    return file.replace(/---/, '' +
      '    <div class="card">');

  } else if (sectionBreakCounter % 2 !== 0) {
    return file.replace(/---/, '' +
      '      </div>\n' +
      '    </div>\n' +
      '    <div class="card">');

  } else {
    return file.replace(/---/, '' +
      '      </div>\n' +
      '    </div>\n' +
      '    <div class="card">');
  }
}

function formatSectionTop(line: string): string {
  return line.replace(/##/gi, '' +
    '      <div class="card-header">\n' +
    '        <span class="card-title">\n') + '\n' +
    '        </span>\n' +
    '      </div>\n' +
    '      <div class="card-body">\n';
}

function formatCodeBlock(file: string): string {
  file.match(/```([^`]*)```/gi).forEach(block => {
    let newBlock = block.replace(/```/gi, '');
    newBlock = newBlock.replace(/<br>/gi, '');

    file = file.replace(`${block}`, `
    <app-code-box
        comment="hello"
        code="${newBlock}">
    </app-code-box>`);
  });

  return file;
}

function formatH5(line: string): string {
  return line.replace(/###/gi, '<h5>') + '</h5>';
}

function formatH6(line: string): string {
  return line.replace(/####/gi, '<h6>') + '</h6>';
}

function formatListItem(line: string): string {
  return line + '<br>';
}

function wrapContent(data: string): string {
  return '' +
    '<div class="row">\n' +
    '  <div class="col-md-12">\n' +
    data +
    '  </div>\n' +
    '</div>';
}

function dothis(): void {
  let file = fs.readFileSync('src/assets/docs/aws-certification.md', 'utf8');
  let sectionBreakCounter = 0;
  let previousReplace = '';

  file.split('\n').forEach(line => {
    if ((line.match(/^#{2} [a-zA-Z0-9_](.*)*$/))) {
      file = file.replace(line, formatSectionTop(line));

    } else if ((line.match(/^#{3} [a-zA-Z0-9_](.*)*$/))){
      file = file.replace(line, formatH5(line));

    } else if ((line.match(/^#{4} [a-zA-Z0-9_](.*)*$/))){
      file = file.replace(line, formatH6(line));

    } else if (line.match(/---/)) {
      sectionBreakCounter++;
      file = formatSection(file, sectionBreakCounter);

    } else if (line.match(/^-/ )) {
      file = file.replace(line, formatListItem(line));

    } else if (line.match(/^[0-9_]./ )) {
      file = file.replace(line, line + '<br>');

    } else if (line.match(/^# [a-zA-Z0-9_](.*)*$/)) {
      file = file.replace(line, '');

    }
  });

  file = wrapContent(file);
  file = formatCodeBlock(file);

  fs.writeFileSync('src/app/pages/devops/aws-certification/cloud-practioner/aws-certification.html', file);
}

dothis();
