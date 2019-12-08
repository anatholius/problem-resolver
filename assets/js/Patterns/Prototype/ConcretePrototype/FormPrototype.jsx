// import React from 'react';
import FormPrototypeAbstract from "../FormPrototypeAbstract";
import Log from "../../../Helper/Log";
import FormPopupDecorator from "../../Decorator/ConcreteDecorator/FormPopupDecorator";
import FormSheetDecorator from "../../Decorator/ConcreteDecorator/FormSheetDecorator";
import FormPrototypeAbstractException from "../../Singleton/Exception/ConcreteException/FormPrototypeAbstractException";

/**
 * @class FormPrototype
 * @memberOf FormPrototype
 * @summary [wzorzec: Prototype -> ConcretePrototype]
 * Powinien zawierać informacje niezbędne do utworzenia formularza:
 * - fields - nazwy pól do wyrenderowania
 * - formConfig - konfiguracja formularza
 * - formData - dane formularza - pochodzą z NullObject (new) lub z resources (edit)
 */
export default class FormPrototype extends FormPrototypeAbstract {
    displayName = 'FormPrototype';
    _formName;
    _formConfig;
    _form;
    settings = {};
    
    constructor(formConfig) {
        super();
        // this._formName = formName;
        this._formConfig = formConfig;
        
        // this.createFormComponent();
        // Log.log({
        //     formName:   formName,
        //     formConfig: formConfig,
        //     props:      props,
        //     this:       this,
        //     support:    this._form.handle.app.support,
        // });
        
        /*
        let decoratorName = formConfig.form.decorator;
        if (decoratorName === 'sheet' && !this._form.handle.app.support.touch) {
            decoratorName = 'popup';
        }
        //*/
        
        // const decorator = new 
        
        //otherwise user can change it dynamically
        // this.decorate(decorator);
        // this.addDecorator(decorator);
        
        
        /*
        this._config = config;
        this._app = this.$f7;
        this._api = contextConfig.app.api;
        this._formName = config.props.formName;
        
        
        this.settings = config.formConfig;
        this.state = {
            form: null,
        };
        // this.handle.app = this.app;
        //*/
    }
    
    /**
     * @deprecated
     */
    extractRouterConfig = () => {
        let routerConfig = {};
        Log.log({
            this:        this,
            _formConfig: this._formConfig,
        });
        if (this._formConfig.form.decorator) {
            this.addDecorator(this._formConfig.form.decorator);
            routerConfig[this._formConfig.form.decorator] = {
                component: this.getPrototype,
                keepAlive: true,
            };
        } else {
            routerConfig.component = this.getPrototype;
        }
        return routerConfig;
    };
    
    addDecorator(decoratorName) {
        if (!this._decorators[decoratorName]) {
            switch (decoratorName) {
                case 'popup':
                    this._form._decorators.push(new FormPopupDecorator());
                    break;
                case 'sheet':
                    this._form._decorators.push(new FormSheetDecorator());
                    break;
                default:
                    throw new FormPrototypeAbstractException(`Nieznany decorator '${decoratorName}'`);
            }
        }
    }
    
    getPrototype = () => {
        Log.log({
            this: this,
        });
        return this._form;
        // return this._form._clone();
    };
    
    createFormComponent = () => {
        const props = {};
        Log.warning({
            this:  this,
            props: props,
        });
        
        // switch (this._formName) {
        //     case 'bankAccount':
        //         this._form = new BankAccountForm(props, this._formConfig);
        //         break;
        //     case 'contractor':
        //         this._form = new ContractorForm(props, this._formConfig);
        //         break;
        //     case 'company':
        //         this._form = new CompanyForm(this._formConfig);
        //         break;
        //     case 'economicEvent':
        //         this._form = new EconomicEventForm(props, this._formConfig);
        //         break;
        //     case 'economicOperation':
        //         this._form = new EconomicOperationForm(props, this._formConfig);
        //         break;
        //     case 'invoice':
        //         this._form = new InvoiceForm(props, this._formConfig);
        //         break;
        //     case 'invoiceItem':
        //         this._form = new InvoiceItemForm(props, this._formConfig);
        //         break;
        //     default:
        //         throw new FormPrototypeException(`There is no implemented form for name '${this._formName}'`);
        // }
    };
    
}