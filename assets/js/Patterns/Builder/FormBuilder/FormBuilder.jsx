// import React from "react";


import LeafBuilder from "../ConcreteBuilder/LeafBuilder";
import CompositeBuilder from "../ConcreteBuilder/CompositeBuilder";
import NullFieldBuilder from "../ConcreteBuilder/NullFieldBuilder";
import FormComponent from "../FormComponent";

export default class FormBuilder {
    /** @type FormContext */
    _context;
    _form;
    _fields = {};
    
    /**
     *
     * @param {FormContext} formContext
     */
    constructor(formContext) {
        this._context = formContext;
    }
    
    buildForm = () => {
        this._form = new FormComponent();
        
        this._buildFields();
        this._setDecorators();
        this._setEvents();
        
        
        return this.getForm();
    };
    
    _getFieldBuilder(configField) {
        if (['text', 'select', 'datepicker', 'toggle', 'checkbox', 'radio'].indexOf(configField.type) !== -1) {
            return new LeafBuilder(configField, this._context.config.form);
        } else if (['selectCollection', 'selectToggle', 'selectButton', 'textToggle', 'collection'].indexOf(configField.type) !== -1) {
            return new CompositeBuilder(configField, this._context.config.form);
        } else {
            return new NullFieldBuilder(configField, this._context.config.form);
        }
    }
    
    _buildFields = () => {
        /** @type Array */
        const renderedFields = this._context.config.render.fields;
        const configs = this._context.config.form.fields;
        for (let field of renderedFields) {
            const configField = configs[field];
            //decide which kind of composite element should be use to build field
            const fieldBuilder = this._getFieldBuilder(configField);
            this._fields = fieldBuilder.buildField()
        }
    };
    _setDecorators = () => {
        // Log.warning({
        //     this: this,
        // });
        // this.addDecorator('leafWrapper');
    };
    _setEvents = () => {
        
    };
    
    getForm = () => {
        return this._form.getOutput;
        // return this._form.getOutput();
    };

    prepareRouterConfig() {
        let routerConfig = {};
        // Log.log({
        //     this:        this,
        //     _formConfig: this._context.config,
        // });
        if (this._context.config.form.decorator) {
            this._form.addDecorator(this._context.config.form.decorator);
            routerConfig[this._context.config.form.decorator] = {
                component: this.getForm(),
                keepAlive: true,
            };
        } else {
            routerConfig.component = this._form;
        }
        return routerConfig;
    }
    
}