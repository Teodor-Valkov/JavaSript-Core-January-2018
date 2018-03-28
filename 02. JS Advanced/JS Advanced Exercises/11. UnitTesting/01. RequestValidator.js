function solve (object) {
  let validMethods = ['GET', 'POST', 'DELETE', 'CONNECT'];

  if (!object.hasOwnProperty('method') || !validMethods.includes(object.method)) {
    throw new Error('Invalid request header: Invalid Method');
  }

  let uriRegex = /^[A-Za-z0-9.]+$/;

  if (!object.hasOwnProperty('uri') || !uriRegex.test(object.uri)) {
    throw new Error('Invalid request header: Invalid URI');
  }

  let validVersions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];

  if (!object.hasOwnProperty('version') || !validVersions.includes(object.version)) {
    throw new Error('Invalid request header: Invalid Version');
  }

  let messageRegex = /^[^<>\\&'"]*$/;

  if (!object.hasOwnProperty('message') || !messageRegex.test(object.message)) {
    throw new Error('Invalid request header: Invalid Message');
  }

  return object;
}

solve({
  method: 'GET',
  uri: 'svn.public.catalog',
  version: 'HTTP/1.1',
  message: ''
});

solve({
  method: 'OPTIONS',
  uri: 'git.master',
  version: 'HTTP/1.1',
  message: '-recursive'
});

solve({
  method: 'POST',
  uri: 'home.bash',
  message: 'rm -rf /*'
});
