import React from "react";
import {ListInput} from "framework7-react";

import FieldWidgetPrototype from "../FieldWidgetPrototype";

/**
 * @class SelectFieldWidget
 * @memberOf WidgetPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 */
export default class SelectFieldWidget extends FieldWidgetPrototype {
    displayName = 'SelectFieldPrototype';
    optionsWithEmptyValue = true;
    
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
            this.settings.value = values[fieldName] ? values[fieldName] : '';
            
            if (values[fieldName]) {
                this.settings.wrapperClass.push('item-input-with-value');
            }
        }
        if (props.data.errors && props.data.errors[formName][fieldName]) {
            this.settings.data.errorMessage = props.data.errors[formName][fieldName].join(' • ');
            this.settings.wrapperClass.push('item-input-with-error-message item-input-invalid');
        }
        
        this.settings.data.options = fieldConfig.options;
        if (fieldConfig.optionsWithEmptyValue !== undefined) {
            this.settings.data.optionsWithEmptyValue = fieldConfig.optionsWithEmptyValue;
        }
        
    };
    
    selectWidget = (props) => {
        this._configureSettings(props);
        
        return <ListInput type="select" name={this.settings.name} floatingLabel outline
                          label={this.settings.label}
                          disabled={this.settings.disabled}
                          value={this.settings.value}
                          onChange={this.settings.onChange}
                          required={this.settings.required}
                          errorMessage={this.settings.data.errorMessage}
                          errorMessageForce={!!this.settings.data.errorMessage}
        >
            {this.settings.data.optionsWithEmptyValue && <option key={-1} value=""></option>}
            {this.settings.data.options && Object.keys(this.settings.data.options).map((key, index) =>
                <option key={index} value={this.settings.data.options[key].value}>
                    {this.settings.data.options[key].text}
                </option>,
            )}
        </ListInput>;
    }
    
}