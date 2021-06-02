const fs = require('fs');

/**
 * Format lists in markup
 * if line after main list item is empty and not sub list, close it
 * @param data body of text to be converted
 * @param listType can be ul/ol
 * @param prefixToReplace the prefix e.g. "- " or "1. " tat should be replaced
 * @param listPattern main list pattern
 * @param subListPattern child list pattern
 */
function formatLists(data: string, listType: string, prefixToReplace: RegExp, listPattern: RegExp, subListPattern: RegExp): string {
  let previousLine = 'none';
  const split = data.split('\n');

  split.forEach((line, index) => {
    let newLine = '';

    // start ul if line matches list item and previous line doesn't
    if (line.match(listPattern) && !previousLine.match(listPattern) && !previousLine.match(subListPattern)) {
      newLine += `<${listType}>\n`;
    }

    // add li if line matches list pattern
    if (line.match(listPattern)) {
      newLine += `  <li>${line.replace(prefixToReplace, '')}</li>`;
    }

    // close ul if line is empty and previous line is list/sub-list item
    if (
      line.match(/^\s*$/gm) &&
      (previousLine.match(listPattern) || previousLine.match(subListPattern))) {
      newLine += `</${listType}>\n`;
    }

    if (newLine !== '') {
      split[index] = line.replace(line, newLine);
    }

    previousLine = line;
  });

  return split.join('\n');
}

function formatUnorderedLists(data: string): string {
  return formatLists(data, 'ul', /^[-][ ]/, /^[-][ ].*/gm, /^([ ]{2}|[ ]{4})[-][ ].*/gm);
}

function formatSLists(data: string, listType: string, prefixToReplace: RegExp, subListPattern: RegExp, parentListPattern: RegExp): string {
  let previousLine = 'none';
  const split = data.split('\n');

  split.forEach((line, index) => {
    let newLine = '';

    // start ul if line matches sublist item and previous line matches parent list item
    if (line.match(subListPattern) && previousLine.match(parentListPattern)) {
      newLine += `  <li><${listType}>\n`;
    }

    // add li if line matches sublist pattern
    if (line.match(subListPattern)) {
      newLine += `    <li>${line.replace(prefixToReplace, '')}</li>`;
    }

    // close ul if line is empty and previous line is list/sub-list item
    if (
      (line.match(/^\s*$|^<\/ul>/gm) || line.match(parentListPattern)) && previousLine.match(subListPattern)) {
      newLine += `  </${listType}></li>\n`;

      if (line.match(/^<\/ul>/gm)) {
        newLine += `</ul>\n`;
      }
    }

    if (newLine !== '') {
      split[index] = line.replace(line, newLine);
    }

    previousLine = line;
  });

  return split.join('\n');
}


function formatUnorderedSubLists(data: string): string {
  return formatSLists(data, 'ul', /^[ ]{2}[-][ ]/, /^[ ]{2}[-][ ].*/gm, /^[ ].*<li>/gm);
}

function formatOrderedLists(data: string): string {
  return formatLists(data, 'ol', /^[0-9][.][ ]/, /^[0-9][.][ ].*/gm, /^([ ]{2}|[ ]{4})[0-9][.][ ].*/gm);
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
  file = formatUnorderedLists(file);
  file = formatUnorderedSubLists(file);
  file = formatOrderedLists(file);
  file = wrapContent(file);

  fs.writeFileSync('src/app/pages/devops/aws-certification/cloud-practioner/aws-certification.html', file);
}

dothis();
