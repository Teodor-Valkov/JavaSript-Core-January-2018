let requester = (() => {
    const baseUrl = "https://baas.kinvey.com";
    const appKey = "kid_HJ-ne0g3M";
    const appSecret = "b35c1736b178497baf3850008bb8007d";

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
})()