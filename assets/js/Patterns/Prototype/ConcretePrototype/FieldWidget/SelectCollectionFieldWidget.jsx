import React from "react";
import {Button, Icon, Input, Segmented, SwipeoutActions, SwipeoutButton} from "framework7-react";

import FieldWidgetPrototype from "../FieldWidgetPrototype";

/**
 * @class SelectCollectionFieldWidget
 * @memberOf WidgetPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 */
export default class SelectCollectionFieldWidget extends FieldWidgetPrototype {
    displayName = 'SelectFieldPrototype';
    optionsWithEmptyValue = true;
    
    
    // constructor(config) {
    //     super(config);
    //     this.settings = Object.assign(this.settings, {
    //         button:  {
    //             name:    null,
    //             actions: {
    //                 add:  {color: 'green', label: 'Dodaj', href: '/form/invoiceItem/'},
    //                 edit: {color: 'orange', label: 'Edytuj', href: '/form/invoiceItem/'},
    //             },
    //         },
    //         actions: {
    //             left:  {
    //                 add: {color: 'green', label: 'Dodaj', href: '/form/invoiceItem/'},
    //             },
    //             right: {
    //                 edit: {color: 'orange', label: 'Edytuj', href: '/form/invoiceItem/'},
    //             },
    //         },
    //     })
    // }
    
    _configureSettings = (props) => {
        
        const fieldName = props.field;
        const formConfig = this.config.formConfig;
        const formName = formConfig.item.name;
        const fieldConfig = formConfig.fields[fieldName];
        const values = props.data.form;

        
        this.settings.data.values = props.values;
        
        this.settings.field.name = fieldConfig.name;
        this.settings.field.label = fieldConfig.label;
        this.settings.field.placeholder = fieldConfig.placeholder ? fieldConfig.placeholder : fieldConfig.label;
        this.settings.field.disabled = props.disabled ? props.disabled : false;
        
        
        if (values) {
            this.settings.field.defaultValue = values[fieldName];
            this.settings.data.value = values[fieldName] ? values[fieldName] : '';
            if (values[fieldName]) {
                this.settings.wrapperClass.push('item-input-with-value');
            }
        }
        if (props.data.errors && props.data.errors[formName][fieldName]) {
            this.settings.data.errorMessage = props.data.errors[formName][fieldName];
            this.settings.wrapperClass.push('item-input-with-error-message item-input-invalid');
        }
        this.settings.field.options = this.config.collections[fieldConfig.collection.name].map((item) => {
            return {value: item.id, text: item[fieldConfig.collection.labelField]}
        });
        
        if (fieldConfig.optionsWithEmptyValue !== undefined) {
            this.settings.field.optionsWithEmptyValue = fieldConfig.optionsWithEmptyValue;
        }
        if (this.settings.field.options.length === 0) {
            this.settings.field.optionsWithEmptyValue = true;
            this.settings.field.optionsWithoutValues = {
                value: -1,
                text:  'Brak opcji',
            };
        }
        
        const buttonsConfig = {};
        if (fieldConfig.buttons) {
            for (let side in fieldConfig.buttons) {
                if (fieldConfig.buttons.hasOwnProperty(side)) {
                    const sideConfig = fieldConfig.buttons[side];
                    buttonsConfig[side] = {};
                    for (let action in sideConfig) {
                        if (sideConfig.hasOwnProperty(action)) {
                            const actionConfig = {...sideConfig[action]};
                            if (!!this.settings.data.value === actionConfig.displayWhen.selected) {
                                delete actionConfig.displayWhen;
                                buttonsConfig[side][action] = actionConfig;
                            }
                        }
                    }
                }
            }
        }
        this.settings.buttons = buttonsConfig;
        
    };
    
    _renderButtons = (side, key) => {
        const buttons = [];
        const sideButtons = this.settings.buttons[side];
        let index = 0;
        for (let action in sideButtons) {
            if (sideButtons.hasOwnProperty(action)) {
                buttons.push(this._renderButton(sideButtons[action], index));
                index++;
            }
        }
        if (buttons.length > 0) {
            return <Segmented className="padding-left">
                {buttons}
            </Segmented>;
        }
    };
    _renderButton = (buttonConfig, key) => {
        return (
            <Button key={key} tabLinkActive color={buttonConfig.color}
                    href={buttonConfig.href}
                    data-parent-form={this.settings.parentForm}>
                {buttonConfig.icon && <Icon icon={buttonConfig.icon}></Icon>} {buttonConfig.label && buttonConfig.label}
            </Button>
        );
    };
    
    selectCollectionWidget = (props) => {
        if (props) {
            this._configureSettings(props);
        }
        
        const controlElement = <Input type="select" name={this.settings.field.name} outline
                                      className="flex-grow-1"
                                      floatingLabel
                                      label={this.settings.field.label}
                                      placeholder={this.settings.field.placeholder}
                                      disabled={false}
                                      value={this.settings.data.value}
                                      onChange={this.settings.field.onChange}
            // validateOnBlur={this.settings.data.errorMessage}
                                      errorMessage={this.settings.data.errorMessage}
                                      errorMessageForce={!!this.settings.data.errorMessage}
        >
            {this.settings.field.optionsWithEmptyValue && <option key={-1}
                // value={this.settings.field.optionsWithoutValues.value ? this.settings.field.optionsWithoutValues.value : ''}>
                                                                  value="">
                {/*{this.settings.field.optionsWithoutValues.text ? this.settings.field.optionsWithoutValues.text : ''}*/}
            </option>}
            {this.settings.field.options && Object.keys(this.settings.field.options).map((key, index) =>
                <option key={index}
                        value={this.settings.field.options[key].value}>{this.settings.field.options[key].text}</option>,
            )}
        
        </Input>;

        return <li className={this.settings.wrapperClass.join(' ')}>
            <div className="item-inner">
                <div className="item-title item-floating-label">{this.settings.field.label}</div>
                <div className="display-flex width-100">
                    {!this.app.support.touch && this._renderButtons('left')}
                    {controlElement}
                    {!this.app.support.touch && this._renderButtons('right')}
                </div>
            </div>
        </li>;
        if (!this.app.support.touch) {
        } else {
            this.settings.wrapperClass[0] = 'itemm-content2';
            this.settings.wrapperClass.push('swipeout');
            return <li className={this.settings.wrapperClass.join(' ')}>
                <div className="item-inner2">
                    <div className="swipeout-content">
                        <div className="item-content">
                            <div className="item-inner">
                                <div className="item-title item-floating-label">{this.settings.field.label}</div>
                                <div className="display-flex width-100">
                                    <Input type="select" name={this.settings.field.name} outline
                                           className="flex-grow-1"
                                           floatingLabel
                                           label={this.settings.field.label}
                                           placeholder={this.settings.field.placeholder}
                                           disabled={false}
                                           value={this.settings.data.value}
                                           onChange={this.settings.field.onChange}
                                           validateOnBlur={this.settings.data.errorMessage}
                                           errorMessage={this.settings.data.errorMessage}
                                           errorMessageForce={!!this.settings.data.errorMessage}
                                    >
                                        {this.settings.field.optionsWithEmptyValue && <option key={-1}
                                                                                              value={this.settings.field.optionsWithoutValues.value ? this.settings.field.optionsWithoutValues.value : ''}>
                                            {this.settings.field.optionsWithoutValues.text ? this.settings.field.optionsWithoutValues.text : ''}
                                        </option>}
                                        {this.settings.field.options && Object.keys(this.settings.field.options).map((key, index) =>
                                            <option key={index}
                                                    value={this.settings.field.options[key].value}>{this.settings.field.options[key].text}</option>,
                                        )}
                                    </Input>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this._renderActions(this.settings.data, this.settings.key)}
                </div>
            </li>;
        }
    };
    
    _renderActions = (item, index) => {
        return <React.Fragment>
            {this.settings.actions.left && this._renderAction('left', item, index)}
            {this.settings.actions.right && this._renderAction('right', item, index)}
        </React.Fragment>
    };
    
    _renderAction = (side, item, index) => {
        // console.info('rendering action with index', index);
        const actionsProps = {};
        if (side === 'left') {
            actionsProps.left = true;
        } else {
            actionsProps.right = true;
        }
        return <SwipeoutActions {...actionsProps}>
            {Object.keys(this.settings.actions[side]).map((action, i) => {
                    const buttonProps = {
                        color: this.settings.actions[side][action].color,
                    };
                    if (typeof this.settings.actions[side][action].action === 'string') {
                        // buttonProps.href = `/${item.id === null ? 'collection' : 'form'}/${this.settings.actions.right[action].action}/${item.id === null ? index : item.id}/`;
                        buttonProps.href = this.settings.actions[side][action].action;
                    } else if (typeof this.settings.actions[side][action].action === 'function') {
                        buttonProps.onClick = this.settings.actions[side][action].action;
                    }
                    const buttonAttributes = {
                        label: this.settings.actions[side][action].label,
                        icon:  this.settings.actions[side][action].icon,
                    };
                    return (
                        <SwipeoutButton key={i} {...buttonProps}>
                            {buttonAttributes.icon && <Icon icon="fad fa-sunrise"></Icon>}
                            {buttonAttributes.label}
                        </SwipeoutButton>
                    )
                },
            )}
        </SwipeoutActions>;
    };
}