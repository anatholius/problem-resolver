import FormConfigInterface from "./FormConfigInterface";

import ApiConfig from "./Element/ApiConfig";
import FieldConfig from "./Element/FieldConfig";
import ItemConfig from "./Element/ItemConfig";
import CollectionConfig from "./Element/CollectionConfig";
import ValidationConfig from "./Element/ValidationConfig";
import FieldsValidationConfig from "./Element/Validation/FieldsValidationConfig";
import FieldRules from "./Element/Validation/FieldValidation/FieldRules";
import CollectionValidationConfig from "./Element/Validation/CollectionValidationConfig";
import FormValidationConfig from "./Element/Validation/FormValidationConfig";

import CollectionUniqueRule from "../../Strategy/Validator/Strategy/Rules/CollectionUniqueRule";
import CollectionRequiredRule from "../../Strategy/Validator/Strategy/Rules/CollectionRequiredRule";
import FormDependsRule from "../../Strategy/Validator/Strategy/Rules/FormDependsRule";

import FormConfig from "./Element/FormConfig";
import BankAccountConfig from "./BankAccountConfig";
import ContractorConfig from "./ContractorConfig";
import Helper from "../../../Plugin/Helpers/Helper";



/**
 * Klasa konfiguracji kontekstu firmy
 *
 * @implements FormConfigInterface
 */
export default class CompanyConfig extends FormConfigInterface {
    type = 'entity';
    /** @type {ApiConfig} = konfiguracja Api backendowego */
    apiConfig = new ApiConfig(
        'companies',
    );
    
    fields = {
        id:            new FieldConfig('hidden', 'id', 'ID', null),
        companyName:   new FieldConfig('text', 'companyName', 'Nazwa firmy', ''),
        isPartnership: new FieldConfig('toggle', 'isPartnership', 'Spółka', false, {
            simple: true,
            event:  {
                afterChange: 'isPartnershipChanged',
            },
        }),
        partnership:   new FieldConfig('selectToggle', 'partnership', 'Rodzaj spółki', '', {
            options:   [
                {value: '', text: ''},
                {value: 'sa', text: 'S.A.'},
                {value: 'zoo', text: 'Sp. z o.o.'},
            ],
            toggledBy: {
                field: 'isPartnership',
                when:  {
                    disabled: false,
                },
            },
        }),
        street:        new FieldConfig('text', 'street', 'Ulica', ''),
        house:         new FieldConfig('text', 'house', 'Nr domu', ''),
        appartment:    new FieldConfig('text', 'appartment', 'Nr lokalu', ''),
        postalCode:    new FieldConfig('text', 'postalCode', 'Kod pocztowy', ''),
        city:          new FieldConfig('text', 'city', 'Miejscowość', ''),
        nip:           new FieldConfig('text', 'nip', 'NIP', ''),
        regon:         new FieldConfig('text', 'regon', 'REGON', ''),
        foundingDate:  new FieldConfig('datepicker', 'foundingDate', 'Data założenia', null),
        bankAccounts:  new BankAccountConfig(),
        contractors:   new ContractorConfig(),
    };
    
    /** @type {ItemConfig} - konfiguracja encji  */
    item = new ItemConfig(
        'company',
        'Firma',
        'Company',
        {
            type:       "radio",
            data:       {
                header:   "",
                title:    (item) => Helper.fullName(item),
                after:    "nip",
                subtitle: "", // only for mediaList
                text:     (item) => Helper.parseAddress(item), // only for mediaList
                footer:   "",
            },
            emptyValue: {
                title: "Wybierz firmę",
            },
            actions:    {
                left:  {
                    delete: {
                        color:  'red',
                        label:  'Usuń',
                        icon:   'fad fa-trash',
                        action: 'company',//TODO: tu chyba trzbea machnąć jakiś callback
                    },
                },
                right: {
                    edit: {
                        color:  'orange',
                        label:  'Edytuj',
                        icon:   'fad fa-pencil',
                        action: 'company',
                    },
                },
            },
        },
        'companyChange',
    );
    
    /** @type {CollectionConfig} - konfiguracja kolekcji  */
    collection = new CollectionConfig(
        'companies',
        'Firmy',
        [],
        'company',
        {
            title:   {
                new:  'Nowa firma',
                edit: 'Edycja firmy',
            },
            actions: {
                new: {
                    color:  'green',
                    label:  'Dodaj',
                    icon:   'fal fa-plus',
                    action: '/form/company/',
                },
            },
        },
    );
    
    form = new FormConfig(
        'company',
        'item',
        'popup',
    );
    
    /**
     * Konfiguracja walidacji
     * @description
     * ##Powinny być trzy konteksty walidacji:
     * 1. ###fieldsConfig
     *      Konfiguracja walidacji pól formularza
     * 2. ###formConfig
     *      Konfiguracja walidacji formularza
     * 3. ###collectionConfig
     *      Konfiguracja walidacji kolekcji
     * @type {ValidationConfig}
     */
    validation = new ValidationConfig(
        new FieldsValidationConfig({
            id:            new FieldRules('number'),
            owner:         false,
            companyName:   new FieldRules('text', true),
            isPartnership: new FieldRules('checkbox'),
            partnership:   new FieldRules('text'),
            street:        new FieldRules('text', true),
            house:         new FieldRules('text', true),
            appartment:    new FieldRules('text'),
            postalCode:    new FieldRules('text', true),
            city:          new FieldRules('text', true),
            nip:           new FieldRules('text', true),
            regon:         new FieldRules('text'),
            foundingDate:  new FieldRules('date', true),
            bankAccounts:  new FieldRules('collection', true),
            contractors:   new FieldRules('collection'),
        }),
        new FormValidationConfig({
            partnership: new FormDependsRule(
                {field: 'isPartnership', value: true},
                {required: true},
            ),
        }),
        new CollectionValidationConfig({
            companyName:  new CollectionUniqueRule(),
            nip:          new CollectionUniqueRule(),
            bankAccounts: new CollectionRequiredRule(),
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