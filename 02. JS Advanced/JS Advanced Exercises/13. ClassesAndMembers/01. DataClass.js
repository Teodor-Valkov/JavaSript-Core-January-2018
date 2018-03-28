class Request {
  constructor (method, uri, version, message) {
    this.method = method;
    this.uri = uri;
    this.version = version;
    this.message = message;
    this.response = undefined;
    this.fulfilled = false;
  }
}

let request = new Request('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(request.method);
console.log(request.uri);
console.log(request.version);
console.log(request.message);
console.log(request.response);
console.log(request.fulfilled);
