module.exports =class Databases {
    constructor(environment, server){
        this.Environment = environment;
        this.Server = server;
    }

    get MySQL() {
        var config = {},
            server = '';

        switch (this.Server) {
            case 'FAKE':
                server = 'FakeData';
                break;
            case 'SECURITY':
                server = 'StoreOnlineSecurity';
                break;
            case 'STORAGE':
                server = 'StoreOnline';
                break;
        }

        switch (this.Environment) {
            case 'DEV':
                config = {
                    host: '127.0.0.1',
                    user: 'root',
                    password: 'Letmein1.',
                    database: server
                };
                break;
            case 'QA':
                config = {
                    host: '127.0.0.1',
                    user: 'root',
                    password: 'Letmein1.',
                    database: 'demosoftexample'
                };
                break;
            case 'PROD':
                config = {
                    host: '127.0.0.1',
                    user: 'root',
                    password: 'Letmein1.',
                    database: 'demosoftexample'
                };
                break;
        }

        return config;
    }
}