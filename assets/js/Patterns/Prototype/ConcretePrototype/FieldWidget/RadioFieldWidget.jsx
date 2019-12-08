import React from "react";
import FieldWidgetPrototype from "../FieldWidgetPrototype";
import {ListItem} from "framework7-react";

/**
 * @class RadioFieldWidget
 * @memberOf WidgetPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 */
export default class RadioFieldWidget extends FieldWidgetPrototype {
    displayName = 'RadioFieldWidget';
    
    _configureSettings = (props) => {
        const fieldName = props.field;
        const formConfig = this.config.formConfig;
        const formName = formConfig.item.name;
        const fieldConfig = formConfig.fields[fieldName];
        const values = this.config.state.form;
        console.log(`this.config(${fieldName})`, this.config);
        console.log(`props`, props);
        this.settings.name = fieldConfig.name;
        this.settings.label = fieldConfig.label;
        this.settings.placeholder = fieldConfig.placeholder ? fieldConfig.placeholder : fieldConfig.label;
        this.settings.disabled = props.disabled ? props.disabled : false;
        this.settings.defaultValue = values[fieldName];
        
        if (values[fieldName]) {
            this.settings.wrapperClass.push('item-input-with-value');
        }
        if (props.data.errors && props.data.errors[formName][fieldName]) {
            this.settings.data.errorMessage = props.data.errors[formName][fieldName];
            this.settings.wrapperClass.push('item-input-with-error-message item-input-invalid');
        }
        
    };
    
    radioWidget = (props) => {
        console.log('trying to render:', props);
        return <ListItem radio
                         defaultChecked={this.config.field.value}
                         name={this.config.field.name}
                         value={this.config.field.value}
                         title={this.config.field.label}
            // after="17:14"
            // subtitle="New messages from John Doe"
            // text="Lorem ipsum dolor sit amet"
        ></ListItem>;
    };
    
}