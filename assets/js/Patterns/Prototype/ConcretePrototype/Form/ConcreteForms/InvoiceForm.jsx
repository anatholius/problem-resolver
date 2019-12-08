// import React from "react";
import FormPrototype from "../../FormPrototype";


export default class InvoiceForm extends FormPrototype {
    displayName = 'InvoiceForm';
    
    constructor(props, formConfig) {
        super(props, formConfig);
        this._fields = [
            'economicEvent',
            'datePrep',
            'contractor',
            'invoiceNumber',
            'paymentMethod',
            'bankAccount',
            'invoiceItems',
            'amount',
        ];
    }
    
}
