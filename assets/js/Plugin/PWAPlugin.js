// import Resource from "./Api/Resource";

let logInside = true;

const PWAPlugin = {
    name: 'pwa',
    // extend app params with resource params
    params: {
        pwa: false,
        installed: false,
    },
    create: function () {
        const app = this;
        // extend app methods with resource methods when app instance just created
        app.pwa = {
            installed: false,
        };
            //     resource: new Resource(),

        /*
        await this.app.pwa.resource.readData().then(result => {
            console.log('Okazuje się że result to:', result);
            let resultData = null;
            if (result) {
                resultData = result;
            }
            console.info('resultData', resultData);
            this.app.data = resultData;
            console.log('resource', this.app.data);
        });
        //*/

        app.pwa.enable = () => {
            logInside = true;
        };
        app.pwa.disable = () => {
            logInside = false;
        };
    },
    on: {
        init: function () {
            const app = this;
            if (app.params.helper) logInside = true;
            if (logInside) console.log('PWAPlugin init');
        },
    },
};
export default PWAPlugin;