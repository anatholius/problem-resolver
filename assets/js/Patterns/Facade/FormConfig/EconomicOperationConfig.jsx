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

/**
 * Klasa konfiguracji kontekstu pozycji na fakturze
 *
 * @implements FormConfigInterface
 *
 */
export default class EconomicOperationConfig extends FormConfigInterface {
    type = 'entity';
    /** @type {ApiConfig} = konfiguracja Api backendowego */
    apiConfig = new ApiConfig(
        'economic_operations',
    );
    
    fields = {
        id:            new FieldConfig('hidden', 'id', 'ID', null),
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
        type:          new FieldConfig('text', 'type', 'Typ operacji', '', {
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
        bookColumn:    new FieldConfig('text', 'bookColumn', 'Docelowa kolumna księgi', ''),
        description:   new FieldConfig('text', 'description', 'Opis operacji', ''),
        isPeriodic:    new FieldConfig('toggle', 'isPeriodic', 'Cykliczna?', ''),
        title:         new FieldConfig('text', 'title', 'Tytuł cyklu operacji', ''),
        period:        new FieldConfig('text', 'period', 'Cykl operacji', ''),
    };
    
    /** @type {ItemConfig} - konfiguracja encji  */
    item = new ItemConfig(
        'economicOperation',
        'Operacja gospodarcza',
        'EconomicOperation',
        {
            type:       'simple',
            data:       {
                header: null,
                title:  'description',
                footer: null,
            },
            emptyValue: {
                title: "Wybierz operację gospodarczą",
            },
            actions:    {
                left:  {
                    delete: {
                        color:  'red',
                        label:  'Usuń',
                        icon:   'fad fa-trash',
                        action: 'economicOperation',//TODO: tu chyba trzbea machnąć jakiś callback
                    },
                },
                right: {
                    edit: {
                        color:  'orange',
                        label:  'Edytuj',
                        icon:   'fad fa-pencil',
                        action: 'economicOperation',
                    },
                },
            },
        },
    );
    
    collection = new CollectionConfig(
        'economicOperations',
        'Operacje gospodarcze',
        [],
        'economicOperation',
        {
            title:   {
                new:  'Nowa operacja gospodarcza',
                edit: 'Edycja operacji gospodarczej',
            },
            actions: {
                new: {
                    color:  'green',
                    label:  'Dodaj',
                    icon:   'fal fa-plus',
                    action: '/form/economicOperation/',
                },
            },
        },
        'economicEvent',
    );
    
    form = new FormConfig(
        'economicOperation',
        'item',
        'sheet',
    );
    
    /**
     * Konfiguracja walidacji
     * @type {ValidationConfig}
     */
    validation = new ValidationConfig(
        new FieldsValidationConfig({
            id:            new FieldRules('number'),
            economicEvent: new FieldRules('text', true),
            type:          new FieldRules('text', true),
            bookColumn:    new FieldRules('text', true),
            description:   new FieldRules('text', true),
        }),
        new FormValidationConfig({
            title:  new FormDependsRule(
                {field: 'isPeriodic', value: true},
                {required: true},
            ),
            period: new FormDependsRule(
                {field: 'isPeriodic', value: true},
                {required: true},
            ),
        }),
        new CollectionValidationConfig({
            description: new CollectionUniqueRule(),
            //TODO: zależność wielopolowa (isPeriodic :: title :: period)
            
            // nip:          new CollectionUniqueRule(),
            // bankAccounts: new CollectionRequiredRule(),
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