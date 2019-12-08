let logInside = false;

const DisplayablePlugin = {
    name: 'displayable',
    // extend app params with resource params
    params: {
        api: false,
        display: {},
    },
    create: function () {
        const app = this;
        // extend app methods with resource methods when app instance just created
        app.displayable = (displayName) => {

            if (!this.display) this.display = {};
            // const data = this.api.resource.data;
            if (!app.helper) {
                throw new Error('You have to install HelperPlugin before DisplayablePlugin');
            }
            if (!app.api) {
                throw new Error('You have to install ApiPlugin before DisplayablePlugin');
            }
            // if (!app.pwa) {
            //     throw new Error('You have to install PWAPlugin before DisplayablePlugin');
            // }

            switch (app.helper.lcfirst(displayName)) {
                case 'resourceData':
                    this.display.resourceData = app.api.resource.data && Object.keys(app.api.resource.data).length > 0;
                    return this.display.resourceData;
                case 'shellNavbar':
                    if (!this.display.shell) this.display.shell = {};

                    this.display.shell.navbar = true;
                    break;
                case 'panelLeft':
                    if (!this.display.panel) this.display.panel = {};

                    this.display.panel.left = false;
                    break;
                case 'panelRight':
                    if (!this.display.panel) this.display.panel = {};
                    this.display.panel.right = app.displayable('buttonCompany') || app.displayable('buttonLogout');
                    break;
                case 'company':
                    this.display.company = app.api.resource.data && app.api.resource.data.current && app.api.resource.data.current.company;
                    return this.display.company;
                case 'companyCollection':
                    this.display.companyCollection = app.api.resource.data.collection && app.api.resource.data.collection.company;
                    return this.display.companyCollection;
                case 'book':
                    this.display.book = app.api.resource.data.collection && app.api.resource.data.collection.book;
                    return this.display.book;
                case 'user':
                    this.display.user = app.api.resource.data && app.api.resource.data.config && app.api.resource.data.config.user;
                    return this.display.user;
                case 'buttonInstall':
                    if (!this.display.button) this.display.button = {};
                    this.display.button.install = app.online && !app.pwa.installed && app.displayable('user');
                    break;
                case 'buttonCompany':
                    if (!this.display.button) this.display.button = {};
                    this.display.button.company = app.api.resource.data && app.api.resource.data.current && app.api.resource.data.current.company &&
                        app.api.resource.data.collection && app.api.resource.data.collection.company;
                    break;
                case 'buttonLogout':
                    if (!this.display.button) this.display.button = {};
                    this.display.button.logout = app.online && app.api.resource.data.config && app.api.resource.data.config.user;
                    break;
                default:
                    console.error('zonk');
                    throw new Error(`Undefined displayName`);
            }


            const indexes = app.helper.camelToArray(displayName);
            let canDisplay = true;
            if (indexes.length === 1) {
                canDisplay = this.display[indexes[0]];
            } else if (indexes.length === 2) {
                canDisplay = this.display[indexes[0]][indexes[1]];
            } else if (indexes.length === 3) {
                canDisplay = this.display[indexes[0]][indexes[1]][indexes[2]];
            }
            // console.log(`Can I display ${displayName}? The answer is:`,canDisplay);
            // console.groupCollapsed(`display('${displayName}'): `, Boolean(canDisplay));
            // console.log('this.display', this.display);
            // console.log('indexes', indexes);
            // console.groupEnd();
            if (logInside) {
                console.info(`Checking if can display "${displayName}" component:`, Boolean(canDisplay));
            }

            return Boolean(canDisplay);
        };

        app.displayable.enable = () => {
            logInside = true;
        };
        app.displayable.disable = () => {
            logInside = false;
        };
    },
    on: {
        init: function () {
            const app = this;
            if (app.params.helper) logInside = true;
            if (logInside) console.log('DisplayablePlugin init');
        },
    },
};
export default DisplayablePlugin;