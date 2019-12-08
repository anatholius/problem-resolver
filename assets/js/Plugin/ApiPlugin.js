import Resource from "./Api/Resource";

let logInside = true;

const ApiPlugin = {
    name: 'api',
    // extend app params with resource params
    params: {
        api: false,
    },
    create: function () {
        const app = this;
        // extend app methods with resource methods when app instance just created
        app.api = {
            resource: new Resource(),
            init: async () => {
                return await this.api.resource.readData().then(result => {
                    // console.log('It turns out that the result is:',result);
                    let resultData = null;
                    if (result) {
                        resultData = result;
                    }
                    // this.logger.log(resultData);
                    return resultData;
                });
            },
        };

        app.api.enable = () => {
            logInside = true;
        };
        app.api.disable = () => {
            logInside = false;
        };
    },
    on: {
        //TODO: Here we can load IndexedDB data or other things before instantiate app
        init: function () {
            const app = this;
            if (app.params.helper) logInside = true;
            if (logInside) console.log('ApiPlugin init');


        },
    },
};
export default ApiPlugin;