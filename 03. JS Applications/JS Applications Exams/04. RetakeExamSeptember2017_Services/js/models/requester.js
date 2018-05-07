let requester = (() => {
    const baseUrl = "https://baas.kinvey.com";
    const appKey = "kid_B17wEqujz";
    const appSecret = "b6d8856cfd8242d9aa0e9b59c7dba098";

    function getAuthHeaders(auth) {
        if (auth === 'basic') {
            return `Basic ${btoa(`${appKey}:${appSecret}`)}`;
        }

        return `Kinvey ${sessionStorage.getItem('authtoken')}`;
    }

    function makeRequest(method, module, url, auth) {
        let request = {
            url: `${baseUrl}/${module}/${appKey}/${url}`,
            method,
            headers: {
                'Authorization': getAuthHeaders(auth)
            }
        };
        return request;
    }

    // GET
    function get(module, url, auth) {
        let request = makeRequest('GET', module, url, auth);
        return $.ajax(request);
    }

    // POST
    function post(module, url, auth, data) {
        let request = makeRequest('POST', module, url, auth);
        request.data = JSON.stringify(data);
        request.headers['Content-Type'] = 'application/json';
        return $.ajax(request);
    }

    // PUT
    function update(module, url, auth, data) {
        let request = makeRequest('PUT', module, url, auth);
        request.data = JSON.stringify(data);
        request.headers['Content-Type'] = 'application/json';
        return $.ajax(request);
    }

    // DELETE
    function remove(module, url, auth) {
        let request = makeRequest('DELETE', module, url, auth);
        return $.ajax(request);
    }

    return {
        get,
        post,
        update,
        remove
    }
})();