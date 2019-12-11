import React from 'react';
import {App, View} from "framework7-react";
import AppConfig from "./Config/AppConfig";
import HomePage from "./Pages/HomePage";
import ResourceConfig from "./Patterns/Facade/ResourceConfig";
import PanelLeftPage from "./Pages/PanelLeftPage";
import PanelRightPage from "./Pages/PanelRightPage";
import FormPage from "./Pages/FormPage";
import AboutPage from "./Pages/AboutPage";
import DynamicRoutePage from "./Pages/DynamicRoutePage";
import NotFoundPage from "./Pages/NotFoundPage";

const resourceConfig = new ResourceConfig();

export default class Shell extends React.Component {
    displayName = this.__proto__.constructor.name;
    static contextType = React.createContext(resourceConfig._form);
    _config;
    app;

    constructor(props, context) {
        super(props, context);

        const appConfig = new AppConfig();
        appConfig.addAsyncRoute('home', '/', {
            component: HomePage,
        }, {
            transition: 'f7-cover-v',
            context: appConfig,
        });
        appConfig.addAsyncRoute('about', '/about/', {
            component: AboutPage,
        }, {
            transition: 'f7-cover-v',
            context: appConfig,
        });
        appConfig.addAsyncRoute('panelLeft', '/panel-left/', {
            component: PanelLeftPage,
        }, {
            transition: 'f7-cover-v',
            context: appConfig,
        });
        appConfig.addAsyncRoute('panelRight', '/panel-right/', {
            component: PanelRightPage,
        }, {
            transition: 'f7-cover-v',
            context: appConfig,
        });
        appConfig.addAsyncRoute('simpleForm', '/form/', {
            component: FormPage,
        }, {
            transition: 'f7-cover-v',
            context: appConfig,
        });
        appConfig.addAsyncRoute('form', '/form/:formName/', {
            component: FormPage,
        }, {
            transition: 'f7-cover-v',
            context: appConfig,
        });
        appConfig.addAsyncRoute('dynamicPage', '/dynamic-route/blog/:blogId/post/:postId/', {
            component: DynamicRoutePage,
        }, {
            transition: 'f7-cover-v',
            // context:    appConfig,
        });
        appConfig.addAsyncRoute('notFounPage', '(.*)', {
            component: NotFoundPage,
        }, {
            transition: 'f7-cover-v',
            // context:    appConfig,
        });
        this._config = appConfig;


        // console.log('this', this);
        // console.log('this.context', this.context);
        // console.log('appConfig', appConfig);

        this.state = {};
        this.deferredPrompt = null;

        // this.$f7.api.init().then(() => {
        //     console.log('api',this.app.api.resource);
        // });
    }


    componentDidMount = () => {
        // console.log(`${this.displayName} is mounting`, this);
        this.app = this.$f7;

        window.addEventListener('beforeinstallprompt', e => {
            // Stash the event so it can be triggered later.
            this.deferredPrompt = e;

            this.setState({
                showInstallButton: true,
            });
        });
        window.addEventListener("online", () => {
            console.log('online listener');
            this.setState({
                online: true,
            });
        });
        window.addEventListener("offline", async () => {
            console.log('offline listener');
            this.setState({
                online: false,
            });
        });

        // console.log('this.app', this.app);

        this.app.utils.extend(this.app, {
            _config: this._config,
            event: this.event,
            handle: this.handle,
        });

        // this.app.logger.startProcess('init IndexedDB data');
        this.app.api.init().then(() => {
            this._config.data = this.app.api.resource.data;
            // this.app.logger.info(this._config.data);
            this.setState(this.state);
        });
        // this.app.logger.endProcess();
    };

    render() {
        return (
            <App params={this._config}>
                <View main url="/" pushState/>
            </App>
        );
    }


    handle = {
        formSubmit: async (e) => {
            console.group(`handle.formSubmit w ${this.displayName}`);

            let ref = this.ref;
            if (this.constructor.name.indexOf('Decorator') !== -1) {
                ref = this._concreteFormComponent.ref;
            }

            const dataset = ref[this.props.formName].current.dataset;
            const formName = dataset.form;
            const formData = this.state.form;

            let stateAfterSubmit = {};

            await this.$f7.methods.formSubmit(formName, formData, this._configForm).then(entity => {
                console.log(`Here we can do something with freshly saved ${formName}:`, entity);
                this.handle.formClose(formName);
            }).catch(validationError => {
                console.error('validationError', validationError);
                if (typeof validationError === 'string') {
                    throw new Error('validationError');
                } else {
                    console.log('validationError', typeof validationError, validationError);
                }
                let stateErrors = this.state.errors || {};
                stateErrors[formName] = validationError.errors;

                stateAfterSubmit = Object.assign(this.state, {
                    errors: stateErrors,
                });
            });

            await this.setState(stateAfterSubmit);

        },
        controlChange: (e) => {
            const control = e.currentTarget;
            const dataset = control.closest('form').dataset;

            let fieldConfig;
            if (this.settings.fields[control.name]) {
                fieldConfig = this.settings.fields[control.name];
            } else {
                fieldConfig = this.settings.fields[dataset.form].collection;
            }

            if (fieldConfig) {
                if (fieldConfig.event && fieldConfig.event['beforeChange'] && typeof this.event[fieldConfig.event['beforeChange']] === 'function') {
                    this.event[fieldConfig.event['beforeChange']](e);
                }
                let value = control.value;
                if (control.type === 'checkbox') {
                    value = control.checked;
                }

                this.setState(prevState => {
                    const newState = {...prevState};
                    newState.form[control.name] = value;
                    this.storage[this.formName][control.name] = value;
                    this.$f7.form.storeFormData(`${this.formName}-form`, this.storage[this.formName]);
                    return newState;
                });

                //update local storage
                if (fieldConfig.event && fieldConfig.event['afterChange'] !== undefined && typeof this.event[fieldConfig.event['afterChange']] === 'function') {
                    this.event[fieldConfig.event['afterChange']](e);
                }
            }
        },
        controlCalendarChange: (value, fieldName, form) => {
            if (this.state
                && ((!this.state.form[fieldName] && value) ||
                    (this.state.form[fieldName] && value.toString() !== this.state.form[fieldName].toString()))
            ) {
                this.setState(prevState => {
                    const newState = {...prevState};
                    newState.form[fieldName] = value[0] ? value[0].toISOString().slice(0, 10) : [];
                    // this.settings.storage[dataset.form][fieldName] = newState.form[dataset.form][fieldName];
                    return newState;
                });
            }
        },
        formClose: (form) => {
            if (form.currentTarget) {
                console.log('closing form2', form.currentTarget);
            }
            let formName = '';
            if (typeof form === 'string') {
                formName = form;
            } else {
                console.error('The form is:', form);
                formName = this.formName;
            }

            if (this.$f7.views.main.router.currentRoute['modal'].opened) {
                this.$f7.views.main.router.back();

                delete this._api.forms[formName];
                this._api.formsQueue.pop();
            } else {
                console.log('Modal is already closed');
            }
        },
    };

    event = {
        installApp: () => {
            // Show the prompt
            this.deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            this.deferredPrompt.userChoice
                .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                        this.setState({
                            showInstallButton: false,
                        });
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    this.deferredPrompt = null;
                });
        },
        projectChange: (e) => {
            const control = e.currentTarget;
            this.app.api.resource.setCurrent(control.value, 'company').then(result => {
                this.setState({
                    current: result,
                });
            });
        },
    };


}
