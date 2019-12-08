import FormConfigInterface from "./FormConfigInterface";

import ApiConfig from "./Element/ApiConfig";
import FieldConfig from "./Element/FieldConfig";
import ItemConfig from "./Element/ItemConfig";
import CollectionConfig from "./Element/CollectionConfig";
import ValidationConfig from "./Element/ValidationConfig";
import FieldsValidationConfig from "./Element/Validation/FieldsValidationConfig";
import FieldRules from "./Element/Validation/FieldValidation/FieldRules";
import FormConfig from "./Element/FormConfig";

/**
 * Klasa konfiguracji kontekstu pozycji na fakturze
 *
 * @implements FormConfigInterface
 *
 */
export default class EconomicEventConfig extends FormConfigInterface {
    type = 'entity';
    /** @type {ApiConfig} = konfiguracja Api backendowego */
    apiConfig = new ApiConfig(
        'economic_events',
    );
    
    fields = {
        id:                new FieldConfig('hidden', 'id', 'ID', null),
        description:       new FieldConfig('text', 'title', 'Tytuł operacji', ''),
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
    };
    
    /** @type {ItemConfig} - konfiguracja encji  */
    item = new ItemConfig(
        'economicEvent',
        'Zdarzenie gospodarcze',
        'EconomicEvent',
        {
            type:       'simple',
            data:       {
                header: null,
                title:  'description',
                footer: null,
            },
            emptyValue: {
                title: "Wybierz zdarzenie gospodarcze",
            },
            actions:    {
                left:  {
                    delete: {
                        color:  'red',
                        label:  'Usuń',
                        icon:   'fad fa-trash',
                        action: 'economicEvent',//TODO: tu chyba trzbea machnąć jakiś callback
                    },
                },
                right: {
                    edit: {
                        color:  'orange',
                        label:  'Edytuj',
                        icon:   'fad fa-pencil',
                        action: 'economicEvent',
                    },
                },
            },
        },
    );
    
    collection = new CollectionConfig(
        'economicEvents',
        'Zdarzenia gospodarcze',
        [],
        'economicEvent',
        {
            title:   {
                new:  'Nowe zdarzenie gospodarcze',
                edit: 'Edycja zdarzenia gospodarczego',
            },
            actions: {
                new: {
                    color:  'green',
                    label:  'Dodaj',
                    icon:   'fal fa-plus',
                    action: '/form/economicEvent/',
                },
            },
        },
        'invoice',
    );
    
    form = new FormConfig(
        'economicEvent',
        'item',
        'sheet',
    );
    
    /**
     * Konfiguracja walidacji
     * @type {ValidationConfig}
     */
    validation = new ValidationConfig(
        new FieldsValidationConfig({
            id:                new FieldRules('number'),
            description:       new FieldRules('text', true),
            economicOperation: new FieldRules('text', true),
        }),
    );
    
    data = {
        collections: {
            company: [
                'economicEvents',
            ],
        },
    };
    
}