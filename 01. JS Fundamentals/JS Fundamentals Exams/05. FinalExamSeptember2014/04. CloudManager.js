function solve (input) {
  let cloud = {};

  for (let i = 0; i < input.length; i++) {
    let tokens = input[i].split(/\s+/);

    if (tokens.length !== 3) {
      continue;
    }

    let file = tokens[0];
    let extension = tokens[1];
    let memory = Number(tokens[2].substring(0, tokens[2].length - 2));

    if (!cloud[extension]) {
      cloud[extension] = {
        files: [],
        memory: []
      };
    }

    cloud[extension]['files'].push(file);
    cloud[extension]['memory'].push(memory);
  }

  for (let extension in cloud) {
    cloud[extension]['files'].sort();
    cloud[extension]['memory'] = getMemory(cloud[extension]['memory']);
  }

  let results = {};
  let extensionsSorted = Object.keys(cloud).sort();

  for (let extension of extensionsSorted) {
    results[extension] = cloud[extension];
  }

  console.log(JSON.stringify(results));

  function getMemory (array) {
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }

    return sum.toFixed(2);
  }
}

solve(['jquery .js 3.2MB',
  'weapon .3dm 0.5MB',
  'diceGame .hs 2.1MB',
  'videoPl .avi 2MB',
  'web .html 54.22MB',
  'justinBieber .mp3 9MB',
  'funnyPic .psd 4MB',
  'player .3dm 13MB',
  'examProblemOne .docx 5MB',
  'profile .aspx 6MB',
  'style .css 178.00MB',
  'lecture .avi 330MB',
  'horseScript .hs 22MB',
  'script .js 17MB',
  'sampleVideo .avi 43MB',
  'psTest .psd 7MB',
  'enemy .3dm 2MB',
  'exceptionsHW .docx 2MB',
  'dagger .3dm 1.9MB',
  'index .aspx 13MB',
  'testHTML .html 2MB',
  'favSong .mp3 5MB',
  'gibberish .txt 1MB',
  'webfundHW .docx 4MB',
  'xml .xml 2MB',
  'spreadsheet .xml 4MB',
  'execute .hs 44.6MB',
  'shoopedIMG .psd 33MB',
  'model .3dm 25MB',
  'movie .avi 700.99MB'
]);
