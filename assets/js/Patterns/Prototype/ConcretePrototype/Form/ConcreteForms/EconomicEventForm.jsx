import React from "react";
import FormPrototype from "../../FormPrototype";


/**
 * @class ContractorForm
 * @memberOf FormPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 *
 */
export default class EconomicEventForm extends FormPrototype {
    displayName = 'EconomicEventForm';
    
    constructor(props, formConfig) {
        super(props, formConfig);
        this._fields = [
            'description',
        ];
    }
    
    event = {};
    
}