import React from "react";
import FormPrototype from "../../FormPrototype";


/**
 * @class ContractorForm
 * @memberOf FormPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 *
 * @example #Komponent formularza Company
 * - id {number} - identyfikator
 * - shortcut {string} - skrót identyfikujący firmę na fakturze
 * - companyName {string} - Nazwa firmy
 * - isPartnership {boolean} - Czy jest spółką?
 * - partnership {enum} - Rodzaj spółki
 * - street {string} - adres - ulica
 * - house {string} - adres - nr domu
 * - appartment {string} - adres - nr lokalu
 * - postalCode {string} - adres - kod pocztowy
 * - city {string} - adres - miejscowość
 * - nip {string} - NIP
 * - regon {string} - REGON
 */
export default class ContractorForm extends FormPrototype {
    displayName = 'ContractorForm';
    
    constructor(props, formConfig) {
        super(props, formConfig);
        this._fields = [
            'shortcut',
            'companyName',
            'partnership',
            'street',
            'house',
            'appartment',
            'postalCode',
            'city',
            'nip',
            'regon',
        ];
    }
    
    event = {
        isPartnershipChanged: (e) => {
            const control = e.currentTarget;
            // console.groupCollapsed(`isPartnershipChanged[${control.name}]`);
            // console.log('control', control);
            // console.log('checked', control.checked);
            // console.log('this.storage', this.storage);
            // console.groupEnd();
            
            this.setState(prevState => {
                const newState = {...prevState};
                if (control.checked) {
                    newState.form['partnership'] = this.storage[this.name]['partnership'];
                } else {
                    newState.form['partnership'] = '';
                }
                return newState;
            });
        },
    };
    
}