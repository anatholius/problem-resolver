import React from "react";
import {Input, Toggle} from "framework7-react";

import FieldWidgetPrototype from "../FieldWidgetPrototype";
// import Log from "../../../../Helper/Log";

/**
 * @class SelectToggleFieldWidget
 * @memberOf WidgetPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 */
export default class TextToggleFieldWidget extends FieldWidgetPrototype {
    displayName = 'SelectToggleFieldWidget';
    optionsWithEmptyValue = true;
    
    
    constructor(config) {
        super(config);
        this.settings = Object.assign(this.settings, {
            toggler: {
                name:     null,
                onChange: null,
                event:    null,
            },
        })
    }
    
    _configureSettings = (props) => {
        const fieldName = props.field;
        this.settings.name = fieldName;
        const formConfig = this.config.formConfig;
        const formName = formConfig.item.name;
        const fieldConfig = formConfig.fields[fieldName];
        const values = props.data.form;
        
        if (values) {
            this.settings.data.values = values;
        }
        console.log('this', this);
        console.log('props', props);
        
        this.settings.field.name = fieldConfig.name;
        this.settings.field.label = fieldConfig.label;
        this.settings.field.placeholder = fieldConfig.placeholder ? fieldConfig.placeholder : fieldConfig.label;
        this.settings.field.disabled = props.disabled ? props.disabled : false;
        
        if (values) {
            this.settings.field.defaultValue = values[fieldName];
            this.settings.data.value = values[fieldName] ? values[fieldName] : '';
        }
        
        this.settings.toggler.name = fieldConfig.toggledBy.field;
        
        if (values) {
            this.settings.toggler.defaultChecked = values[this.settings.toggler.name];
        }
        this.settings.toggler.onChange = this.config.handle.controlChange;
        this.settings.toggler.event = this.config.event;
        
        
        if (values) {
            if (values[fieldName]) {
                this.settings.wrapperClass.push('item-input-with-value');
            }
        }
        if (props.data.errors && props.data.errors[formName][fieldName]) {
            this.settings.data.errorMessage = props.data.errors[formName][fieldName];
            this.settings.wrapperClass.push('item-input-with-error-message item-input-invalid');
        }
        
        this.settings.field.options = fieldConfig.options;
        if (fieldConfig.optionsWithEmptyValue !== undefined) {
            this.settings.field.optionsWithEmptyValue = fieldConfig.optionsWithEmptyValue;
        }
        
    };
    
    selectToggleWidget = (props) => {
        this._configureSettings(props);
        console.warn(`Będziemy renderować selectToggleWidget( ${this.settings.name} )`, this.settings);
        
        return <li className={this.settings.wrapperClass.join(' ')}>
            <div className="item-media item-toggle">
                <Toggle name={this.settings.toggler.name}
                        defaultChecked={this.settings.toggler.defaultChecked}
                        onChange={this.settings.toggler.onChange}
                        afterChange={this.settings.toggler.event.afterChange}
                        color="blue"
                        toggle="init"
                        init
                />
            </div>
            <div className="item-inner">
                <div className="item-title item-floating-label">{this.settings.field.label}</div>
                <div className="item-input-wrap">
                    <Input type="select" name={this.settings.field.name} outline
                           className={`item-input-wrap${!this.settings.data.values || !this.settings.data.values[this.settings.toggler.name] ? ' disabled' : ''}`}
                           floatingLabel
                           label={this.settings.field.label}
                           placeholder={this.settings.field.placeholder}
                           disabled={!this.settings.data.values || !this.settings.data.values[this.settings.toggler.name]}
                           value={this.settings.data.value}
                           onChange={this.settings.field.onChange}
                        // validateOnBlur={this.settings.data.errorMessage}
                           errorMessage={this.settings.data.errorMessage}
                           errorMessageForce={!!this.settings.data.errorMessage}
                    >
                        <option key={-1} value=""></option>
                        {this.settings.field.options && Object.keys(this.settings.field.options).map((key, index) =>
                            <option key={index}
                                    value={this.settings.field.options[key].value}>{this.settings.field.options[key].text}</option>,
                        )}
                    </Input>
                </div>
            </div>
        </li>;
    }
    
}