import FormConfigInterface from "./FormConfigInterface";

import ApiConfig from "./Element/ApiConfig";
import FieldConfig from "./Element/FieldConfig";
import ItemConfig from "./Element/ItemConfig";
import CollectionConfig from "./Element/CollectionConfig";
import ValidationConfig from "./Element/ValidationConfig";
import FieldsValidationConfig from "./Element/Validation/FieldsValidationConfig";
import FieldRules from "./Element/Validation/FieldValidation/FieldRules";
import FormConfig from "./Element/FormConfig";
import FormValidationConfig from "./Element/Validation/FormValidationConfig";
import FormDependsRule from "../../Strategy/Validator/Strategy/Rules/FormDependsRule";
import CollectionValidationConfig from "./Element/Validation/CollectionValidationConfig";
import CollectionUniqueRule from "../../Strategy/Validator/Strategy/Rules/CollectionUniqueRule";
import CollectionRequiredRule from "../../Strategy/Validator/Strategy/Rules/CollectionRequiredRule";


/**
 * Klasa konfiguracji kontekstu pozycji na fakturze
 *
 * @implements FormConfigInterface
 *
 */
export default class InvoiceItemConfig extends FormConfigInterface {
    type = 'collection';
    /** @type {ApiConfig} = konfiguracja Api backendowego */
    apiConfig = new ApiConfig(
        'invoice_items',
    );
    
    fields = {
        id:                new FieldConfig('hidden', 'id', 'ID', null),
        economicEvent:     new FieldConfig('selectCollection', 'economicEvent', 'Zdarzenie gospodarcze', '', {
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
        economicOperation: new FieldConfig('selectCollection', 'economicOperation', 'Operacja gospodarcza', '', {
            optionsWithEmptyValue: true,
            collection:            {
                name:       'economicOperations',
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
                        href:        '/form/economicOperation/',
                    },
                    edit: {
                        displayWhen: {
                            selected: true,
                        },
                        color:       'orange',
                        label:       'Edytuj',
                        icon:        'fad fa-pencil',
                        href:        '/form/economicOperation/:id/',
                    },
                },
            },
        }),
        pos:               new FieldConfig('text', 'pos', 'Nr pozycji', ''),
        title:             new FieldConfig('text', 'title', 'Tytuł operacji', ''),
        legalBasis:        new FieldConfig('text', 'legalBasis', 'Podstawa prawna', ''),
        unit:              new FieldConfig('text', 'unit', 'Jednostka', ''),
        unitCount:         new FieldConfig('text', 'unitCount', 'Ilość', ''),
        unitPrice:         new FieldConfig('text', 'unitPrice', 'Cena jednostkowa', ''),
        price:             new FieldConfig('text', 'price', 'Wartość', ''),
    };
    
    /** @type {ItemConfig} - konfiguracja encji  */
    item = new ItemConfig(
        'invoiceItem',
        'Pozycja na fakturze',
        'InvoiceItem',
        {
            type:       'simple',
            data:       {
                header: null,
                title:  'economicOperation',
                footer: 'price',
            },
            emptyValue: {
                title: "Wybierz pozycję na fakturze",
            },
            actions:    {
                left:  {
                    delete: {
                        color:  'red',
                        label:  'Usuń',
                        icon:   'fad fa-trash',
                        action: 'invoiceItem',//TODO: tu chyba trzbea machnąć jakiś callback
                    },
                },
                right: {
                    edit: {
                        color:  'orange',
                        label:  'Edytuj',
                        icon:   'fad fa-pencil',
                        action: 'invoiceItem',
                    },
                },
            },
        },
    );
    
    collection = new CollectionConfig(
        'invoiceItems',
        'Pozycje na fakturze',
        [],
        'invoiceItem',
        {
            type:    'card',
            title:   {
                new:  'Nowa pozycja na fakturze',
                edit: 'Edycja pozycji na fakturze',
            },
            actions: {
                new: {
                    color:  'green',
                    label:  'Dodaj',
                    icon:   'fal fa-plus',
                    action: '/form/invoiceItem/',
                },
            },
        },
        'invoice',
    );
    
    form = new FormConfig(
        'invoiceItem',
        'collection',
        'sheet',
    );
    
    /**
     * Konfiguracja walidacji
     * @type {ValidationConfig}
     */
    validation = new ValidationConfig(
        new FieldsValidationConfig({
            id:                new FieldRules('number'),
            economicEvent:     new FieldRules('text', true),
            economicOperation: new FieldRules('text', true),
            title:             new FieldRules('text'),
            legalBasis:        new FieldRules('text', true),
            unit:              new FieldRules('text', true),
            unitCount:         new FieldRules('text', true),
            unitPrice:         new FieldRules('text', true),
            price:             new FieldRules('text', true),
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
                'economicEvents',
                'economicOperations',
            ],
        },
    };
    
}