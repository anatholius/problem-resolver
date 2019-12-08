import React from "react";
import FieldWidgetPrototype from "../FieldWidgetPrototype";
import {Input} from "framework7-react";

/**
 * @class DatepickerFieldWidget
 * @memberOf WidgetPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 */
export default class DatepickerFieldWidget extends FieldWidgetPrototype {
    displayName = 'TextFieldWidget';
    
    _configureSettings = (props) => {
        const fieldName = props.field;
        const formConfig = this.config.formConfig;
        const formName = formConfig.item.name;
        const fieldConfig = formConfig.fields[fieldName];
        
        
        const values = props.data.form;
        
        this.settings.name = fieldConfig.name;
        this.settings.label = fieldConfig.label;
        this.settings.placeholder = fieldConfig.placeholder ? fieldConfig.placeholder : fieldConfig.label;
        this.settings.disabled = props.disabled ? props.disabled : false;
        
        if (values) {
            this.settings.defaultValue = values[fieldName];
            
            if (values[fieldName]) {
                this.settings.wrapperClass.push('item-input-with-value');
            }
        }
        if (props.data.errors && props.data.errors[formName][fieldName]) {
            this.settings.data.errorMessage = props.data.errors[formName][fieldName].join(' • ');
            this.settings.wrapperClass.push('item-input-with-error-message item-input-invalid');
        }
        
    };
    
    datepickerWidget = (props) => {
        this._configureSettings(props);
        console.warn(`Będziemy renderować datepickerWidget( ${this.settings.name} )`, this.settings);
        
        return <li className={this.settings.wrapperClass.join(' ')}>
            <div className="item-inner">
                <div className="item-title item-floating-label">{this.settings.label}</div>
                <div className="item-input-wrap">
                    <Input type="text" name={this.settings.name}
                           label={this.settings.label}
                           placeholder={this.settings.placeholder}
                           disabled={this.settings.disabled}
                           defaultValue={this.settings.defaultValue}
                           onChange={this.settings.onChange}
                        // validateOnBlur={this.settings.validateOnBlur}
                           errorMessage={this.settings.data.errorMessage}
                           errorMessageForce={!!this.settings.data.errorMessage}
                    />
                </div>
            </div>
        </li>;
    };
    
    
}