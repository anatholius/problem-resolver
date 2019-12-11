import Log from "./Helpers/Log";

let logInside = true;

const LoggerPlugin = {
    name: 'logger',
    // extend app params with debugger params
    params: {
        logger: false,
    },
    create: function () {
        const app = this;
        // extend app methods with debugger methods when app instance just created
        app.logger = Log;
        if (app.helper) {
            app.logger.helper = app.helper;
        } else {
            throw new Error('You have to install HelperPlugin before LogPlugin');
        }

        app.logger.enable = () => {
            logInside = true;
        };
        app.logger.disable = () => {
            logInside = false;
        };
    },
    on: {
        init: function () {
            const app = this;
            if (app.params.log) logInside = true;
            if (logInside) console.log('LoggerPlugin init');
        },
        pageBeforeIn: function (page) {
            if (logInside) console.log('pageBeforeIn', page);
        },
        pageAfterIn: function (page) {
            if (logInside) console.log('pageAfterIn', page);
        },
        pageBeforeOut: function (page) {
            if (logInside) console.log('pageBeforeOut', page);
        },
        pageAfterOut: function (page) {
            if (logInside) console.log('pageAfterOut', page);
        },
        pageInit: function (page) {
            if (logInside) console.log('pageInit', page);
        },
        pageBeforeRemove: function (page) {
            if (logInside) console.log('pageBeforeRemove', page);
        },
    },
};
export default LoggerPlugin;