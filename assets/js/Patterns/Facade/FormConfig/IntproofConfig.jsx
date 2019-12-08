import FormConfigInterface from "./FormConfigInterface";

import ApiConfig from "./Element/ApiConfig";
import FieldConfig from "./Element/FieldConfig";
import ItemConfig from "./Element/ItemConfig";
import CollectionConfig from "./Element/CollectionConfig";
import ValidationConfig from "./Element/ValidationConfig";
import FieldsValidationConfig from "./Element/Validation/FieldsValidationConfig";
import FieldRules from "./Element/Validation/FieldValidation/FieldRules";
import CollectionValidationConfig from "./Element/Validation/CollectionValidationConfig";

import CollectionUniqueRule from "../../Strategy/Validator/Strategy/Rules/CollectionUniqueRule";
import CollectionRequiredRule from "../../Strategy/Validator/Strategy/Rules/CollectionRequiredRule";

import FormConfig from "./Element/FormConfig";


/**
 * Klasa konfiguracji kontekstu faktury
 *
 * @implements FormConfigInterface
 * 
 */
export default class IntproofConfig extends FormConfigInterface {
    type = 'entity';
    /** @type {ApiConfig} = konfiguracja Api backendowego */
    apiConfig = new ApiConfig(
        'intproofs',
    );
    
    fields = {
        id:          new FieldConfig('hidden', 'id', 'ID', null),
        city:        new FieldConfig('text', 'city', 'Miejscowość', ''),
        datePrep:    new FieldConfig('datepicker', 'datePrep', 'Data wystawienia', ''),
        proofNumber: new FieldConfig('text', 'proofNumber', 'Numer DW', ''),
        // intproofItems: new IntproofItemContext(),
        amount:      new FieldConfig('text', 'amount', 'Razem', ''),
    };
    
    /** @type {ItemConfig} - konfiguracja encji  */
    item = new ItemConfig(
        'intproof',
        'Dowód wewnętrzny',
        'Intproof',
        {
            type:       'simple',
            data:       {
                header: (item) => 'full name of owner',//Helper.fullName(item.buyer),
                title:  "proofNumber",
                after:  "amount",
                footer: null,
            },
            emptyValue: {
                title: "Wybierz DW",
            },
            actions:    {
                left:  {
                    delete: {
                        color:  'red',
                        label:  'Usuń',
                        icon:   'fad fa-trash',
                        action: 'intproof',//TODO: tu chyba trzbea machnąć jakiś callback
                    },
                },
                right: {
                    edit: {
                        color:  'orange',
                        label:  'Edytuj',
                        icon:   'fad fa-pencil',
                        action: 'intproof',
                    },
                },
            },
        },
    );
    
    /** @type {CollectionConfig} - konfiguracja kolekcji  */
    collection = new CollectionConfig(
        'intproofs',
        'Dowody wewnętrzne',
        [],
        'intproof',
        {
            title:   {
                new:  'Nowy dowód wewnętrzny',
                edit: 'Edycja dowodu wewnętrznego',
            },
            actions: {
                new: {
                    color:  'green',
                    label:  'Dodaj',
                    icon:   'fal fa-plus',
                    action: '/form/intproof/',
                },
            },
        },
    );
    
    form = new FormConfig(
        'intproof',
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
            city:          new FieldRules('text', true),
            datePrep:      new FieldRules('datepicker', true),
            proofNumber:   new FieldRules('text', true),
            intproofItems: false,
            amount:        new FieldRules('text', true),
        }),
        new CollectionValidationConfig({
            proofNumber:   new CollectionUniqueRule(),
            intproofItems: new CollectionRequiredRule(),
        }),
    );
    
    data = null;
}