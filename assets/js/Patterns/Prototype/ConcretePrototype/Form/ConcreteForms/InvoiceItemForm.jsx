import React from "react";
import FormPrototype from "../../FormPrototype";


export default class InvoiceItemForm extends FormPrototype {
    displayName = 'InvoiceItemForm';
    
    constructor(props, formConfig) {
        super(props, formConfig);
        this._fields = [
            'economicEvent',
            'pos',
        ];
    }
    
}
