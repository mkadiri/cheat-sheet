const fs = require('fs');

function formatLists(data: string): string {
  const listPattern = /^[-][ ].*/gm;
  const subListPattern = /^([ ]{2}|[ ]{4})[-][ ].*/gm;
  let previousLine = 'none';

  const split = data.split('\n');

  split.forEach((line, index) => {
    let newLine = '';

    if (line.match(listPattern)) {
      if (!previousLine.match(listPattern) && !previousLine.match(subListPattern)) {
        newLine += '<ul>\n';
      }

      newLine += `  <li>${line.replace(/^-/, '')}</li>\n`;
    }

    if (line.match(/^\s*$/gm) && (previousLine.match(listPattern) || previousLine.match(subListPattern))) {
      newLine += '</ul>\n';
    }

    previousLine = line;

    if (newLine !== '') {
      split[index] = line.replace(line, newLine);
    }
  });

  return split.join('\n');
}

function formatSection(data: string): string {
  const pattern = /---/gi;
  const split = data.match(pattern);

  split.forEach((block, index) => {
    let newContent = '';

    if (index !== 0) {
      newContent += `
            </div>
        </div>\n`;
    }

    if (split.length - 1 !== index ) {
      newContent += `<div class="card">\n`;
    }

    data = data.replace(block, newContent);
  });

  return data;
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

function formatMainHeading(data: string): string {
  const pattern = /#{2} (.*)(\n)/gi;

  data.match(pattern).forEach(heading => {
    const newHeading = `
    <div class="card-header">
        <span class="card-title">
            ${
              heading
                .replace(/#{2}/, '')
                .replace('\n', '')
            }
        </span>
    </div>
    <div class="card-body">\n\n`;

    data = data.replace(heading, newHeading);
  });

  return data;
}

function formatH6(data: string): string {
  const pattern = /#{4} (.*)(\n)/gi;

  data.match(pattern).forEach(heading => {
    const newHeading = heading.replace(/#{4}/, '<h6>')
      .replace('\n', '') + '</h6>\n';
    data = data.replace(heading, newHeading);
  });

  return data;
}

function formatH5(data: string): string {
  const pattern = /#{3} (.*)(\n)/gi;

  data.match(pattern).forEach(heading => {
    const newHeading = heading.replace(/#{3}/, '<h5>')
      .replace('\n', '') + '</h5>\n';
    data = data.replace(heading, newHeading);
  });

  return data;
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

  // remove first line heading
  file = file.replace(/#.*/, '');
  file = formatCodeBlock(file);
  file = formatSection(file);
  file = formatH6(file);
  file = formatH5(file);
  file = formatMainHeading(file);
  file = formatLists(file);
  file = wrapContent(file);

  fs.writeFileSync('src/app/pages/devops/aws-certification/cloud-practioner/aws-certification.html', file);
}

dothis();
