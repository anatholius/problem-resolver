import React from "react";
import FormPrototype from "../../FormPrototype";


/**
 * @class CompanyForm
 * @memberOf FormPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 *
 * @example #Komponent formularza Company
 * - id {number} - identyfikator
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
 * - foundingDate {date} - Data założenia
 */
export default class CompanyForm {
    displayName = 'CompanyForm';
    
    constructor(formConfig) {
        // super(formConfig);
        
        this._fields = [
            'companyName',
            'partnership',
            'street',
            'house',
            'appartment',
            'postalCode',
            'city',
            'nip',
            'regon',
            'foundingDate',
            'bankAccounts',
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
        bankAccountSheetOpen: (dataset) => {
            const context = this.config.fields.bankAccounts;
            let values;
            if (dataset.mode === 'new') {
                values = this.getValuesFromConfig(context);
            } else {
                values = this.state.form['company'].values['bankAccounts'][dataset.rowIndex];
            }
            const bankAccountForm = {
                values: values,
                config: {
                    url:    `${this.api.config.baseApiUrl}/${context.action}${values['id'] ? `/${values['id']}` : ''}`,
                    action: context.action,
                    name:   context.name,
                    crud:   dataset.mode,
                },
            };
            
            this.setState((prevState) => {
                return {
                    form:    {...prevState.form, bankAccounts: bankAccountForm},
                    actions: {
                        bankAccountSheetOpened: true,
                    },
                }
            })
        },
        bankAccountRemove:    (index) => {
            console.log("deleting");
            this.setState(prevState => {
                const newState = {...prevState};
                newState.form['company'].values['bankAccounts'].splice(index, 1);
                return newState;
            });
        },
    };
    
}