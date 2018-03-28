function solve (input) {
  let applications = {};
  let controllers = {};
  let models = {};
  let views = {};

  for (let line of input) {
    if (line.startsWith('$app')) {
      let tokens = line.split('=');
      let applicationName = tokens[1].replace("'", '').replace("'", '');

      applications[applicationName] = {};
    } else if (line.startsWith('$controller')) {
      let tokens = line.split("'");
      let applicationName = tokens[3];
      let controllerName = tokens[1];

      if (!controllers[applicationName]) {
        controllers[applicationName] = [];
      }

      controllers[applicationName].push(controllerName);
    } else if (line.startsWith('$model')) {
      let tokens = line.split("'");
      let applicationName = tokens[3];
      let modelName = tokens[1];

      if (!models[applicationName]) {
        models[applicationName] = [];
      }

      models[applicationName].push(modelName);
    } else if (line.startsWith('$view')) {
      let tokens = line.split("'");
      let applicationName = tokens[3];
      let viewName = tokens[1];

      if (!views[applicationName]) {
        views[applicationName] = [];
      }

      views[applicationName].push(viewName);
    }
  }

  for (let application in applications) {
    let sortedControllers = controllers[application] === undefined
      ? []
      : controllers[application].sort((a, b) => a.localeCompare(b));

    let sortedModels = models[application] === undefined
      ? []
      : models[application].sort((a, b) => a.localeCompare(b));

    let sortedViews = views[application] === undefined
      ? []
      : views[application].sort((a, b) => a.localeCompare(b));

    applications[application] = {
      controllers: sortedControllers,
      models: sortedModels,
      views: sortedViews
    };
  }

  applications = sortObject(applications);

  console.log(JSON.stringify(applications));

  function sortObject (applications) {
    let keys = Object.keys(applications);
    let keysSorted = keys.sort((a, b, applications) => {
      return sortApplications(a, b);
    });

    let sortedObject = {};

    for (let key of keysSorted) {
      sortedObject[key] = applications[key];
    }

    return sortedObject;
  }

  function sortApplications (a, b, applications) {
    if (applications[a]['controllers'].length === applications[b]['controllers'].length) {
      return applications[a]['models'].length - applications[b]['models'].length;
    }

    return applications[b]['controllers'].length - applications[a]['controllers'].length;
  }
}

// solve(["$app='MyApp'",
//   "$controller='My Controller'&app='MyApp'",
//   "$model='My Model'&app='MyApp'",
//   "$view='My View'&app='MyApp'"]);

solve(["$controller='PHPController'&app='Language Parser'",
  "$controller='JavaController'&app='Language Parser'",
  "$controller='C#Controller'&app='Language Parser'",
  "$controller='C++Controller'&app='Language Parser'",
  "$app='Garbage Collector'",
  "$controller='GarbageController'&app='Garbage Collector'",
  "$controller='SpamController'&app='Garbage Collector'",
  "$app='Language Parser'"]);
