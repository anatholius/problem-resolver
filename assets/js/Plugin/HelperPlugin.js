import Helper from "./Helpers/Helper";

let logInside = true;

const HelperPlugin = {
    name: 'helper',
    // extend app params with helper params
    params: {
        helper: false,
    },
    create: function () {
        const app = this;
        // extend app methods with helper methods when app instance just created
        app.helper = Helper;

        app.helper.enable = () => {
            logInside = true;
        };
        app.helper.disable = () => {
            logInside = false;
        };
    },
    on: {
        init: function () {
            const app = this;
            if (app.params.helper) logInside = true;
            if (logInside) console.log('HelperPlugin init');
        },
    },
};
export default HelperPlugin;