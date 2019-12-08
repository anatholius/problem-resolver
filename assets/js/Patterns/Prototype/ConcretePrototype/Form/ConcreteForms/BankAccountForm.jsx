// import React from "react";
import FormPrototype from "../../FormPrototype";


/**
 * @class ContractorForm
 * @memberOf FormPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 *
 */
export default class BankAccountForm extends FormPrototype {
    displayName = 'ContractorForm';
    
    constructor(props, formConfig) {
        super(formConfig);
        this._fields = [
            'bankAccountName',
            'bankName',
            'accountNumber',
            'isDefault',
        ];
    }
    
    events = {};
    
}