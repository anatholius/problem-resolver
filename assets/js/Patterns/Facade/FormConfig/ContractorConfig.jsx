import FormConfigInterface from "./FormConfigInterface";
import ApiConfig from "./Element/ApiConfig";
import FieldConfig from "./Element/FieldConfig";
import ItemConfig from "./Element/ItemConfig";
import CollectionConfig from "./Element/CollectionConfig";
import FormConfig from "./Element/FormConfig";
import ValidationConfig from "./Element/ValidationConfig";
import FieldsValidationConfig from "./Element/Validation/FieldsValidationConfig";
import FieldRules from "./Element/Validation/FieldValidation/FieldRules";
import FormValidationConfig from "./Element/Validation/FormValidationConfig";
import FormDependsRule from "../../Strategy/Validator/Strategy/Rules/FormDependsRule";
import CollectionValidationConfig from "./Element/Validation/CollectionValidationConfig";
import CollectionUniqueRule from "../../Strategy/Validator/Strategy/Rules/CollectionUniqueRule";

/**
 * Klasa konfiguracji kontekstu kontrahenta
 *
 * @implements FormConfigInterface
 * 
 */
export default class ContractorConfig extends FormConfigInterface {
    type = 'entity';
    /** @type {ApiConfig} = konfiguracja Api backendowego */
    apiConfig = new ApiConfig(
        'contractors',
    );
    
    fields = {
        id:            new FieldConfig('hidden', 'id', 'ID', null),
        shortcut:      new FieldConfig('text', 'shortcut', 'Nazwa firmy', ''),
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
    };
    
    /** @type {ItemConfig} - konfiguracja encji  */
    item = new ItemConfig(
        'contractor',
        'Kontrahent',
        'ContractorAccount',
        {
            type:       'simple',
            data:       {
                header: "nip",
                title:  "companyName",
                // footer: (item) => Helper.parseAddress(item),
            },
            emptyValue: {
                title: "Wybierz nabywcę",
            },
            actions:    {
                left:  {
                    delete: {
                        color:  'red',
                        label:  'Usuń',
                        icon:   'fad fa-trash',
                        action: 'contractor',//TODO: tu chyba trzbea machnąć jakiś callback
                    },
                },
                right: {
                    edit: {
                        color:  'orange',
                        label:  'Edytuj',
                        icon:   'fad fa-pencil',
                        action: 'contractor',
                    },
                },
            },
        },
    );
    
    /** @type {CollectionConfig} - konfiguracja kolekcji  */
    collection = new CollectionConfig(
        'contractors',
        'Kontrahenci',
        [],
        'contractor',
        {
            title:   {
                new:  'Nowy kontrahent',
                edit: 'Edycja kontrahenta',
            },
            actions: {
                new: {
                    color:  'green',
                    label:  'Dodaj',
                    icon:   'fal fa-plus',
                    action: '/form/contractor/',
                },
            },
        },
        'company',
    );
    
    form = new FormConfig(
        'contractor',
        'item',
        'popup',
    );
    
    validation = new ValidationConfig(
        new FieldsValidationConfig({
            id:            new FieldRules('number'),
            shortcut:      new FieldRules('text'),
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
        }),
        new FormValidationConfig({
            partnership: new FormDependsRule(
                {field: 'isPartnership', value: true},
                {required: true},
            ),
        }),
        new CollectionValidationConfig({
            companyName: new CollectionUniqueRule(),
            nip:         new CollectionUniqueRule(),
        }),
    );
    
    data = {};
}