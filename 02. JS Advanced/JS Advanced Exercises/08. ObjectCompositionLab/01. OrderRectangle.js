function solve (input) {
  function createRect (width, height) {
    let rect = {
      width: width,
      height: height,
      area: () => rect.width * rect.height,
      compareTo: (other) => other.area() - rect.area() || other.width - rect.width
    };

    return rect;
  }

  let rects = [];

  for (let line of input) {
    let width = line[0];
    let height = line[1];
    rects.push(createRect(width, height));
  }

  rects.sort((a, b) => a.compareTo(b));

  return rects;
}

solve([[10, 5], [3, 20], [5, 12]]);
