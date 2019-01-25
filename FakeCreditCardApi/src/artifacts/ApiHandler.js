module.exports = class ApiHandler {
    constructor(response, request) {
        this.Response = response;
        this.Request = request;

        this.Response.removeHeader('X-Powered-By');
    }
    
    GetResponse(headers, statuscode, data, convertJson) {
        for (let i = 0; i < headers.length; i++) {
            this.Response.set(headers[i].Key, headers[i].Value);
        }

        this.Response.status(statuscode);
        this.Response.send(convertJson === true ? JSON.stringify(data) : data);
    }

    get GetResponseHeaders(){
        return [
            {Key: 'Content-Type', Value: 'application/json;charset=utf-8'}
        ];
    }
}