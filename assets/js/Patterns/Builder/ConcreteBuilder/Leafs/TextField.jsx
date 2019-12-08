import React from "react";
import {Input} from "framework7-react";
import FieldAbstract from "./Abstraction/FieldAbstract";
import Props from "./Abstraction/Props";

/**
 * @extends FieldAbstract
 */
export default class TextField extends FieldAbstract {
    /** @override */
    _output = (
        <Input type="text"
            //    name={this.settings.name}
            //    label={this.settings.label}
            //    placeholder={this.settings.placeholder}
            //    disabled={this.settings.disabled}
            //    defaultValue={this.settings.defaultValue}
            //    onChange={this.settings.onChange}
            // // validateOnBlur={this.settings.validateOnBlur}
            //    errorMessage={this.settings.data.errorMessage}
            //    errorMessageForce={!!this.settings.data.errorMessage}
        />
    );
    
    /**
     *
     * @param {FieldConfig} fieldConfig
     * @param {FormConfigInterface} formConfig - formConfig
     */
    constructor(fieldConfig, formConfig) {
        super(fieldConfig, formConfig);
        this._configureProps();
        
        // this.addDecorator('leafWrapper');
        // this.addDecorator('leafInner');
        // this.addDecorator('controlWrapper');
    }
    
    _configureProps = (props) => {
        // Log.info({
        //     this:         this,
        //     _fieldConfig: this._fieldConfig,
        //     _formConfig:  this._formConfig,
        // });
        
        const formName = this._formConfig.item.name;
        const fieldConfig = this._fieldConfig;
        const fieldName = fieldConfig.name;
        const values = props ? props.data.form : null;
        
        this._props = new Props(
            fieldConfig.type,
            fieldConfig.name,
            fieldConfig.label,
            "",
            fieldConfig.placeholder ? fieldConfig.placeholder : fieldConfig.label,
            false,
            "",
            undefined,
            undefined,
            "",
        );
        // console.log(`fieldConfig(${fieldName})`, fieldConfig);
        // console.log('props', props);
        // console.log('this', this);
        
        // this._props.name = fieldConfig.name;
        // this._props.label = fieldConfig.label;
        // this._props.placeholder = fieldConfig.placeholder ? fieldConfig.placeholder : fieldConfig.label;
        this._props.disabled = props && props.disabled ? props.disabled : false;
        if (values) {
            this._props.defaultValue = values[fieldName];
            
            if (values[fieldName]) {
                this._props.wrapperClass.push('item-input-with-value');
            }
        }
        if (props && props.data && props.data.errors && props.data.errors[formName][fieldName]) {
            this._props.data.errorMessage = props.data.errors[formName][fieldName];
            this._props.wrapperClass.push('item-input-with-error-message item-input-invalid');
        }
        
    };
    
    /*
    _origOutput = (
        <li className={this.settings.wrapperClass.join(' ')}>
            <div className="item-inner">
                <div className="item-title item-floating-label">{this.settings.label}</div>
                <div className="item-input-wrap">
                    <Input type="text"
                           name={this.settings.name}
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
        </li>
    )
    //*/
}