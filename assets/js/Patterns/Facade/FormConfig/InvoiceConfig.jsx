import FormConfigInterface from "./FormConfigInterface";

import ApiConfig from "./Element/ApiConfig";
import FieldConfig from "./Element/FieldConfig";
import ItemConfig from "./Element/ItemConfig";
import CollectionConfig from "./Element/CollectionConfig";
import ValidationConfig from "./Element/ValidationConfig";
import FieldsValidationConfig from "./Element/Validation/FieldsValidationConfig";
import FieldRules from "./Element/Validation/FieldValidation/FieldRules";
import FormValidationConfig from "./Element/Validation/FormValidationConfig";
import CollectionValidationConfig from "./Element/Validation/CollectionValidationConfig";

import FormDependsRule from "../../Strategy/Validator/Strategy/Rules/FormDependsRule";
import CollectionUniqueRule from "../../Strategy/Validator/Strategy/Rules/CollectionUniqueRule";
import CollectionRequiredRule from "../../Strategy/Validator/Strategy/Rules/CollectionRequiredRule";

import InvoiceItemConfig from "./InvoiceItemConfig";
import FormConfig from "./Element/FormConfig";

/**
 * Klasa konfiguracji kontekstu faktury
 * 
 * @implements FormConfigInterface
 * 
 */
export default class InvoiceConfig extends FormConfigInterface {
    type = 'entity';
    /** @type {ApiConfig} = konfiguracja Api backendowego */
    apiConfig = new ApiConfig(
        'invoices',
    );
    
    fields = {
        economicEvent: new FieldConfig('selectCollection', 'economicEvent', 'Zdarzenie gospodarcze', '', {
            optionsWithEmptyValue: true,
            collection:            {
                name:       'economicEvents',
                labelField: 'description',
            },
            buttons:               {
                right: {
                    add:  {
                        displayWhen: {
                            selected: false,
                        },
                        color:       'green',
                        label:       'Dodaj',
                        icon:        'fal fa-plus',
                        href:        '/form/economicEvent/',
                    },
                    edit: {
                        displayWhen: {
                            selected: true,
                        },
                        color:       'orange',
                        label:       'Edytuj',
                        icon:        'fad fa-pencil',
                        href:        '/form/economicEvent/:id/',
                    },
                },
            },
        }),
        id:            new FieldConfig('hidden', 'id', 'ID', null),
        city:          new FieldConfig('text', 'city', 'Miejscowość', ''),
        datePrep:      new FieldConfig('datepicker', 'datePrep', 'Data wystawienia', ''),
        contractor:    new FieldConfig('selectCollection', 'contractor', 'Nabywca', '', {
            optionsWithEmptyValue: true,
            collection:            {
                name:       'contractors',
                labelField: 'companyName',
            },
            buttons:               {
                right: {
                    add:  {
                        displayWhen: {
                            selected: false,
                        },
                        color:       'green',
                        label:       'Dodaj',
                        icon:        'fal fa-plus',
                        href:        '/form/contractor/',
                    },
                    edit: {
                        displayWhen: {
                            selected: true,
                        },
                        color:       'orange',
                        label:       'Edytuj',
                        icon:        'fal fa-pencil',
                        href:        '/form/contractor/:id/',
                    },
                },
            },
        }),
        invoiceNumber: new FieldConfig('text', 'invoiceNumber', 'Numer faktury', ''),
        paymentMethod: new FieldConfig('select', 'paymentMethod', 'Sposób płatności', 'transfer', {
            options:               [
                {value: 'transfer', text: 'przelew'},
                {value: 'cash', text: 'gotówka'},
            ],
            optionsWithEmptyValue: false,
        }),
        paymentDate:   new FieldConfig('datepicker', 'paymentDate', 'Data płatności', ''),
        bankAccount:   new FieldConfig('selectCollection', 'bankAccount', 'Konto do przelewu', '', {
            optionsWithEmptyValue: false,
            collection:            {
                name:       'bankAccounts',
                labelField: 'bankAccountName',
            },
        }),
        invoiceItems:  new InvoiceItemConfig(),
        amount:        new FieldConfig('text', 'amount', 'Razem', ''),
        paid:          new FieldConfig('checkbox', 'paid', '', ''),
        paidValue:     new FieldConfig('text', 'paidValue', 'Zapłacono', ''),
        paidLeft:      new FieldConfig('text', 'paidLeft', 'Pozostało do zapłaty', ''),
    };
    
    /** @type {ItemConfig} - konfiguracja encji  */
    item = new ItemConfig(
        'invoice',
        'Faktura',
        'Invoice',
        {
            type:       'simple',
            data:       {
                header: "datePrep",
                title:  "invoiceNumber",
                after:  "amount",
                // footer: (item) => Helper.fullName(item.contractor),
            },
            emptyValue: {
                title: "Wybierz fakturę",
            },
            actions:    {
                left:  {
                    delete: {
                        color:  'red',
                        label:  'Usuń',
                        icon:   'fad fa-trash',
                        action: 'invoice',//TODO: tu chyba trzbea machnąć jakiś callback
                    },
                },
                right: {
                    edit: {
                        color:  'orange',
                        label:  'Edytuj',
                        icon:   'fad fa-pencil',
                        action: 'invoice',
                    },
                },
            },
        },
    );
    
    /** @type {CollectionConfig} - konfiguracja kolekcji  */
    collection = new CollectionConfig(
        'invoices',
        'Faktury',
        [],
        'invoice',
        {
            title:   {
                new:  'Nowa faktura',
                edit: 'Edycja faktury',
            },
            actions: {
                new: {
                    color:  'green',
                    label:  'Dodaj',
                    icon:   'fal fa-plus',
                    action: '/form/invoice/',
                },
            },
        },
    );
    
    form = new FormConfig(
        'invoice',
        'item',
        'popup',
    );
    
    /**
     * Konfiguracja walidacji faktury
     * @type {ValidationConfig}
     */
    validation = new ValidationConfig(
        new FieldsValidationConfig({
            id:            new FieldRules('number'),
            economicEvent: new FieldRules('text', true),
            city:          new FieldRules('text', true),
            datePrep:      new FieldRules('datepicker', true),
            contractor:    new FieldRules('text', true),
            invoiceNumber: new FieldRules('text', true),
            paymentMethod: new FieldRules('text', true),
            paymentDate:   new FieldRules('datepicker', true),
            bankAccount:   new FieldRules('text', true),
            invoiceItems:  false,
            amount:        new FieldRules('text', true),
            paid:          new FieldRules('text'),
            paidValue:     new FieldRules('text'),
            paidLeft:      new FieldRules('text', true),
        }),
        new FormValidationConfig({
            paidValue: new FormDependsRule(
                {field: 'paid', value: true},
                {required: true},
            ),
        }),
        new CollectionValidationConfig({
            invoiceNumber: new CollectionUniqueRule(),
            invoiceItems:  new CollectionRequiredRule(),
        }),
    );
    
    data = {
        collections: {
            company: [
                'contractors',
                'bankAccounts',
                'economicEvents',
            ],
        },
    };
}