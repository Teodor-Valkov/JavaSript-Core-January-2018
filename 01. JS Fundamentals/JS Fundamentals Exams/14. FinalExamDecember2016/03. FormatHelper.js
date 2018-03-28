function solve (input) {
  let text = input[0];

  text = text.replace(/\s*([.,!?:;])\s*/g, (match, group) => `${group} `);
  text = text.replace(/\.\s+(?=[0-9])/g, (match) => '.');
  text = text.replace(/"\s*([^"]+?)\s*"/g, (match, group) => `"${group}"`);
  text = text.replace(/([.,!?:;])\s+(?=[.,!?:;])/g, (match, group) => group);

  console.log(text);
}

solve(['Terribly formatted text      .  With chaotic spacings." Terrible quoting   "! Also this date is pretty confusing : 20   .   12.  16 .']);
