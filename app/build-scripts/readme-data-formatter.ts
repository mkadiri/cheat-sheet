class ReadmeDataFormatter {
  /**
   * Format lists in markup
   * if line after main list item is empty and not sub list, close it
   * @param data body of text to be converted
   * @param listType can be ul/ol
   * @param listPattern main list pattern
   * @param listPatternPrefix prefix of the pattern above
   * @param subListPattern child list pattern
   * @param subListPatternPrefix prefix of the pattern above
   */
  formatList(
    data: string,
    listType: string,
    listPattern: RegExp,
    listPatternPrefix: RegExp,
    subListPattern: RegExp,
    subListPatternPrefix: RegExp
  ): string {
    if (listType !== 'ul' && listType !== 'ol') {
      throw new Error('Invalid list type, must be ul or ol');
    }

    const split = data.split('\n');
    const emptyPattern = /^\s*$/gm;

    let prev = 'none';

    split.forEach((curr, index) => {
      let out = '';

      if (prev.match(listPattern) && !curr.match(subListPattern)) {
        out += `  </li>\n`;
      }

      // sub-list
      if (curr.match(subListPattern) && prev.match(listPattern)) {
        out += `    <${listType}>\n`;
      }

      if ((curr.match(listPattern) || curr.match(emptyPattern)) && prev.match(subListPattern)) {
        out += `    </${listType}>\n`;
      }

      if (prev.match(subListPattern) && (curr.match(emptyPattern) || curr.match(listPattern))) {
        out += `  </li>\n`;
      }

      if (curr.match(subListPattern)) {
        out += `      <li>\n`;
        out += `        ${curr.replace(subListPatternPrefix, '')}\n`;
        out += `      </li>`;
      }

      // list
      if (curr.match(listPattern) && !prev.match(listPattern) && !prev.match(subListPattern)) {
        out += `<${listType}>\n`;
      }

      if (curr.match(emptyPattern) && (prev.match(listPattern) || prev.match(subListPattern))) {
        out += `</${listType}>\n`;
      }

      if (curr.match(listPattern)) {
        out += `  <li>\n`;
        out += `    ${curr.replace(listPatternPrefix, '')}`;
      }


      if (out !== '') {
        split[index] = curr.replace(curr, out);
      }

      prev = curr;
    });

    return split.join('\n');
  }

  formatUnorderedList(data: string): string {
    return this.formatList(
      data,
      'ul',
      /^[-][ ].*/gm,
      /^[-][ ]/,
      /^([ ]{2})[-][ ].*/gm,
      /^[ ]{2}[-][ ]/
    );
  }

  formatOrderedList(data: string): string {
    return this.formatList(
      data,
      'ol',
      /^[0-9][.][ ].*/gm,
      /^[0-9][.][ ]/,
      /^([ ]{2})[0-9][.][ ].*/gm,
      /^([ ]{2})[0-9][.][ ]/
    );
  }

  formatSection(data: string): string {
    const pattern = /---/gi;
    const split = data.match(pattern);

    if (split == null) {
      return data;
    }

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

  formatCodeBlock(file: string): string {
    const split = file.match(/[/`]{3}([^`]*)[/`]{3}/gi);

    if (split == null) {
      return file;
    }

    split.forEach(block => {
      let newBlock = block.replace(/[/`]{3}/gi, '');
      newBlock = newBlock.replace(/<br>/gi, '');

      file = file.replace(`${block}`, `
    <app-code-box
        comment="hello"
        code="${newBlock}">
    </app-code-box>`);
    });

    return file;
  }

  formatMainHeading(data: string): string {
    const pattern = /#{2} (.*)(\n)/gi;
    const split = data.match(pattern);

    if (split == null) {
      return data;
    }

    split.forEach(heading => {
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

  formatH6(data: string): string {
    const pattern = /#{4} (.*)(\n)/gi;
    const split = data.match(pattern);

    if (split == null) {
      return data;
    }

    split.forEach(heading => {
      const newHeading = heading.replace(/#{4}/, '<h6>')
        .replace('\n', '') + '</h6>\n';
      data = data.replace(heading, newHeading);
    });

    return data;
  }

  formatH5(data: string): string {
    const pattern = /#{3} (.*)(\n)/gi;
    const split = data.match(pattern);

    if (split == null) {
      return data;
    }

    split.forEach(heading => {
      const newHeading = heading.replace(/#{3}/, '<h5>')
        .replace('\n', '') + '</h5>\n';
      data = data.replace(heading, newHeading);
    });

    return data;
  }

  wrapContent(data: string): string {
    return '' +
      '<div class="row">\n' +
      '  <div class="col-md-12">\n' +
      data +
      '  </div>\n' +
      '</div>';
  }

  format(data: string): string {
    // remove first line heading
    data = data.replace(/#.*/, '');
    data = this.formatCodeBlock(data);
    data = this.formatSection(data);
    data = this.formatH6(data);
    data = this.formatH5(data);
    data = this.formatMainHeading(data);
    data = this.formatUnorderedList(data);
    data = this.formatOrderedList(data);
    data = this.wrapContent(data);

    return data;
  }
}

module.exports = ReadmeDataFormatter;
