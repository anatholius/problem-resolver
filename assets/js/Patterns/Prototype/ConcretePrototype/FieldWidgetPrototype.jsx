import React from 'react';
import WidgetPrototypeAbstract from "../WidgetPrototypeAbstract";
// import Log from "../../../Helper/Log";

/**
 * @class FieldWidgetPrototype
 * @memberOf WidgetPrototype
 * @summary [wzorzec: Prototype -> ConcretePrototype]
 */
export default class FieldWidgetPrototype extends WidgetPrototypeAbstract {
    displayName = 'FieldWidgetPrototype';

    settings = {
        wrapperClass: ["item-content", "item-input", "item-input-outline"],
        parentForm: null,
        field: {
            type: 'text',
            name: null,
            label: null,
            placeholder: null,
            disabled: false,
            defaultValue: null,
            onChange: null,
            validateOnBlur: false,
            errorMessageForce: null,
            required: true,
        },
        data: {
            errorMessage: null,
            value: '',
            values: null,
        },
    };


    constructor(config) {
        super(config);
        this.settings.field.onChange = config.handle.controlChange;
        this.settings.parentForm = config.formConfig.collection.parentForm;
    }

}