import FormContext from "../../ValueObject/FormContext";
import ResourceConfig from "../../Facade/ResourceConfig";
import FormState from "../../ValueObject/FormState";
import FormBuilder from "../../Builder/FormBuilder/FormBuilder";
import FormDirector from "../../Builder/FormBuilder/FormDirector";

/**
 * @abstract
 */
export default class FormMaker {
    displayName = 'FormMaker';

    _receiver;
    _renderedFields;
    _formComponent;
    _formContext;
    _route = {
        config: {},
    };
    _form = {
        component: null,
        context: null,
        state: null,
    };

    constructor(receiver) {
        this._receiver = receiver;
    }

    makeForm = (formName) => {
        this._prepareForm(formName);
        this._receiver.config = this._prepareRouteConfig();
    };

    _prepare = {
        form: {
            component: () => {
                const formBuilder = new FormBuilder(this._form.context);
                const formDirector = new FormDirector(formBuilder);
                // Log.warning({
                //     this:         this,
                //     formBuilder:  formBuilder,
                //     formDirector: formDirector,
                // });
                this._form.component = formDirector.createForm();
            },
            context: (formName) => {
                const resourceConfig = new ResourceConfig();
                const formConfig = resourceConfig.getFormConfig(formName);
                this._form.context = new FormContext(
                    {
                        form: formConfig,
                        render: {
                            fields: this._renderedFields,
                        },
                    },
                    this._receiver.options.props,
                    new FormState(formName, formConfig),
                );
            },
            state: (formName) => {
                // Log.startProcess('prepare form state');
                // Log.intention(this.displayName,
                //     `Here we need to prepare initial form[${formName}] state`,
                //     `How can we do that?`,
                //     `We have this =`, this,
                // );
                // Log.todo(this.displayName,
                //     `Prepare state for two cases:`,
                //     ` - 'new' form`,
                //     ` - 'edit' form`,
                // );
                // Log.effect(this.displayName,
                //     `For now we don't have any effect!`,
                // );
                // Log.endProcess();
            },
        },
        routeConfig: () => {
        },
    };

    _prepareForm = (formName) => {
        this._prepare.form.context(formName);
        this._prepare.form.state(formName);
        // TODO: trzeci parametr w wywołaniu new FormContext() powyżej do rozpatrzenia
        // 1° new:
        // - dane - domyślne formularza - odczytywane z konfiguracji
        // - errors - komunikaty błędów - nie będą tu inicjowane, chyba że będziemy działać na historii zdarzeń
        // 2° edit:
        // - data - odczytywane z resources TODO: należy uściślić gdzie będzie to resources i jaki będzie do
        //                                        niego dostęp
        // - errors - komunikaty błędów - nie będą tu inicjowane, chyba że będziemy działać na historii zdarzeń
        this._prepare.form.component();
    };

    _prepareRouteConfig = () => {
        // Log.log({
        //     this:        this,
        //     _formConfig: this._form.context.config,
        // });
        if (this._form.context.config.form.decorator) {

            //TODO: To trzeba przenieść do buildera
            // this._formComponent.addDecorator(this._formContext.config.form.decorator);

            this._route.config[this._form.context.config.form.decorator] = {
                component: this._form.component,
            };
        } else {
            this._route.config.component = this._form.component;
        }
        return this._route.config;
    }

}
