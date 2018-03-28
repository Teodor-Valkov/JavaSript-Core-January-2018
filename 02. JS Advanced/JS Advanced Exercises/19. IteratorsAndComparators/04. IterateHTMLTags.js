function * extractTags (html) {
  let regex = /<[^>]+>/g;
  let match = regex.exec(html);
  while (match) {
    let tag = match[0];
    yield tag;

    match = regex.exec(html);
  }
}

let html = `<html><body><p align='center'><span lang='en'>Hello</span>, HTML</p> Bye, bye</body></html>`;

for (let tag of extractTags(html)) {
  console.log(tag);
}
