import React from 'react';
import Log from "../../../../Helper/Log";
import WidgetFactoryCoordinator from "../../../Visitor/ConcreteVisitor/WidgetFactoryCoordinator";

function decorate(target) {
    // return function (target) {
    console.error('decorationg render');
    console.log('target', target);
    return target.constructor.ObjectComponent();
    // };
}

export default class FormAbstract extends React.Component {
    displayName = 'FormAbstract';
    _decorators = [];
    ref = {};
    data = {
        collections: {},
    };
    fieldWidget = {};
    
    handle = {
        app: null,
        
        formSubmit:            async (e) => {
            // console.clear();
            console.group(`handle.formSubmit w ${this.displayName}`);
            
            // const formComponent = this._component._form;
            
            const self = this;
            Log.info({
                this:                   this,
                constructorName:        this.constructor.name,
                typeofconstructorName:  typeof this,
                _concreteFormComponent: this._concreteFormComponent,
                'this.context':         this.context,
                'this._configForm':     this._configForm,
                // formComponent: formComponent,
            });
            let ref = this.ref;
            if (this.constructor.name.indexOf('Decorator') !== -1) {
                ref = this._concreteFormComponent.ref;
            }
            
            const control = e.currentTarget;
            // console.log('dataset', dataset);
            const dataset = ref[this.props.formName].current.dataset;
            const formName = dataset.form;
            const formData = this.state.form;
            
            Log.log({
                this:                      this,
                'this.state':              this.state,
                dataset:                   dataset,
                'this.ref':                this.ref,
                'ref':                     ref,
                formName:                  formName,
                formData:                  formData,
                'this.ref[this.formName]': this.ref[formName],
            });
            console.log('this.state', this.state);
            
            let stateAfterSubmit = {};
            
            await this.$f7.methods.formSubmit(formName, formData, this._configForm).then(entity => {
                console.log(`Tu możemy coś zrobić ze świeżo zapisanym ${formName}:`, entity);
                
                
                console.log('this.$f7router.previousRoute', this.$f7router.previousRoute);
                console.log('router.back');
                this.handle.formClose(formName);
            }).catch(validationError => {
                console.error('validationError', validationError);
                if (typeof validationError === 'string') {
                    throw validationError;
                } else {
                    console.log('validationError', typeof validationError, validationError);
                }
                let stateErrors = this.state.errors || {};
                stateErrors[formName] = validationError.errors;
                
                
                Log.log({
                    this:         this,
                    'this.state': this.state,
                    stateErrors:  stateErrors,
                });
                stateAfterSubmit = Object.assign(this.state, {
                    errors: stateErrors,
                });
            });
            
            // const formObject = this._concreteFormComponent;
            // formObject.state = await stateAfterSubmit;
            await this.setState(stateAfterSubmit);
            
            console.groupEnd();
        },
        controlChange:         (e) => {
            // alert("handleControlChange");
            const control = e.currentTarget;
            const dataset = control.closest('form').dataset;
            // console.groupCollapsed(`controlChange[${control.name}]`);
            // console.log('control', control);
            // console.log('control.name', control.name);
            // console.log('dataset', dataset);
            // console.log('type', control.type);
            // console.log('value', control.value);
            // console.log('checked', control.checked);
            // console.groupEnd();
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
                    // this.$f7.form.storeFormData(`${this.formName}-form`, newState.form);
                    // this.storage = this.$f7.form.getFormData(`${this.formName}-form`);
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
            console.log('form', form);
            console.log('value', typeof value, value);
            console.log('this.state.form', this.state.form);
            console.log('this.state.form[form]', this.state.form[form]);
            if (this.state
                && (!this.state.form[fieldName] && value
                    ||
                    this.state.form[fieldName] &&
                    value.toString() !== this.state.form[fieldName].toString())
            ) {
                this.setState(prevState => {
                    const newState = {...prevState};
                    console.log('date.value', value);
                    newState.form[fieldName] = value[0] ? value[0].toISOString().slice(0, 10) : [];
                    // this.settings.storage[dataset.form][fieldName] = newState.form[dataset.form][fieldName];
                    return newState;
                });
            }
        },
        formClose:             (form) => {
            console.log('closing form', form);
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
            
            console.warn('this.$f7.views.main.router', this.$f7.views.main.router);
            console.warn('this.$f7.views.main.router.currentRoute[\'modal\']', this.$f7.views.main.router.currentRoute['modal']);
            
            // if (!this.$f7route.modal.opened) {
            if (this.$f7.views.main.router.currentRoute['modal'].opened) {
                this.$f7.views.main.router.back();
                // this.$f7.views.main.router.currentRoute['modal'].destroy();
                delete this._api.forms[formName];
                console.log('formsQueue', this._api.formsQueue);
                this._api.formsQueue.pop();
                console.group('form closed');
                console.log('forms', this._api.forms);
                console.log('formsQueue', this._api.formsQueue);
                console.groupEnd();
            } else {
                console.log('Modal is already closed');
            }
        },
    };
    
    constructor(props, formConfig) {
        super(props, formConfig);
        
        Log.info({
            this:       this,
            props:      props,
            formConfig: formConfig,
        });
        
        this._api = props.api;
        
        this.handle.app = this.$f7;
        
        this.setupUsedCollections();
        this._configForm = this.context;
        
        if (this._api.formsQueue.indexOf(this.props.formName) === -1) {
            const formParams = {
                formName: this.props.formName,
                config:   this.context,
            };
            if (this.props.id) {
                formParams.id = Number(this.props.id);
            }
            
            this._api.configForm(formParams);
        }
        
        this.state = {
            form: this._api.forms[this.props.formName],
        };
        
        this.ref[this.props.formName] = React.createRef();
        
        console.log('this.ref', this.ref);
        
        this.configureFields();
        
        console.group('form open');
        console.log('this', this);
        console.warn('this.$f7.views.main.router.currentRoute[\'modal\']', this.$f7.views.main.router.currentRoute['modal']);
        console.log('forms', this._api.forms);
        console.log('formsQueue', this._api.formsQueue);
        console.groupEnd();
    }
    
    setErrors = (errors) => {
        console.error('trying to set errors');
        this.setState({
            errors: errors,
        });
    };
    
    setupUsedCollections = () => {
        if (this.context.data && this.context.data.collections) {
            for (let parentFormName in this.context.data.collections) {
                if (this.context.data.collections.hasOwnProperty(parentFormName)) {
                    const parentFormData = this.props.api.resource.data.current[parentFormName];
                    for (let field of this.context.data.collections[parentFormName]) {
                        this.data.collections[field] = parentFormData[field];
                    }
                }
            }
        }
    };
    
    configureFields = (fields = null) => {
        Log.info({
            this:         this,
            'this.event': this.event,
        });
        const widgetFactoryCoordinator = new WidgetFactoryCoordinator(this);
        // const fieldCollectionsDetector = new FieldCollectionsDetector(this);
        
        if (!fields) {
            fields = Object.keys(this.context.fields);
        }
        
        for (let fieldName of fields) {
            const fieldConfig = this.context.fields[fieldName];
            // fieldCollectionsDetector.setCollections(fieldConfig);
            widgetFactoryCoordinator.setFieldWidget(fieldConfig);
        }
    };
    
    prepareForm = () => {
        console.log('interface of prepareForm');
        this._form = <form></form>
    };
    getFormComponent = () => {
        return this._form;
    };
    
    /**
     * @ionterface
     * @abstract
     */
    prepareOutputComponent = () => {
        console.log('interface of prepareOutputComponent');
        // this._outputComponent = '';
    };
    
    
    /**
     * @abstract
     */
    getOutputComponent = () => {
        // Log.warning({
        //     this: this,
        // });
        //     this.prepareOutputComponent();
        //    
        return this._outputComponent;
    };
    getDecoratedComponent = () => {
        // Log.warning({
        //     this: this,
        // });
        //     this.prepareOutputComponent();
        //    
        return this._outputComponent;
    };
    
    
    // @decorate
    render() {
        console.log('rendering form w InvoiceForm');
        Log.info({
            this: this,
        });
        
        //*
        if (this._decorators.length > 0) {
            for (let decorator of this._decorators) {
                this._outputComponent = decorator.decorate(this);
            }
        } else {
            this._outputComponent = this.ObjectComponent;
        }
        //*/
        
        return this._outputComponent;
    }
    
    
    /**
     * Kopiuje właściwości prototypu do klona
     *
     * @return {WidgetPrototypeAbstract}
     */
    _clone = () => {
        Log.log({
            this:             this,
            _outputComponent: this._outputComponent,
        });
        let form;
        form = new this.constructor(this.context.form.name, this._configForm, this.props);
        /*
        if (this._outputComponent.constructor.name.indexOf('Decorator') !== -1) {
            widget = new this.constructor(this._outputComponent);
        } else {
            widget = new this._outputComponent.constructor(this._outputComponent.props, this._outputComponent.context);
        }
        //*/
        let keys = Object.keys(this);
        console.log('keys', keys);
        console.log('form', form);
        keys.forEach(k => {
            // form[k] = this[k];
            form.setProperty(k, this[k]);
            console.log(k, form[k] ? ` cloned` : ' not cloned');
        });
        console.log('form', form);
        
        Log.warning({
            cloned: form,
        });
        return form;
    };
    
    /**
     * Ustawia właściwość obiektu
     *
     * @param property
     * @param value
     */
    setProperty = (property, value) => {
        this[property] = value;
    };
}