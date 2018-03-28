function solve (input) {
  let html = input.join('\n');

  let regex = /<a\s+(?:[^>]+\s+)?href\s*=\s*(?:'([^']*)'|"([^"]*)"|([^\s>]+))[^>]*>/g;

  let match = regex.exec(html);

  while (match) {
    let hrefValue = match[1];

    if (hrefValue === undefined) {
      hrefValue = match[2];
    }

    if (hrefValue === undefined) {
      hrefValue = match[3];
    }

    console.log(hrefValue);
    match = regex.exec(html);
  }
}

solve(['<a href="http://softuni.bg" class="new"></a>']);
