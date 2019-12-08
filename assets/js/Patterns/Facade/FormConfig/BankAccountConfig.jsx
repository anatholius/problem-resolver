/**
 * Klasa Konfiguracji kontekstu konta bankowego
 *
 * @implements FormConfigInterface
 *
 * @fileOverview Klasa Konfiguracji kontekstu konta bankowego
 */
import FormConfigInterface from "./FormConfigInterface";
import ApiConfig from "./Element/ApiConfig";
import FieldConfig from "./Element/FieldConfig";
import ItemConfig from "./Element/ItemConfig";
import CollectionConfig from "./Element/CollectionConfig";
import ValidationConfig from "./Element/ValidationConfig";
import FieldsValidationConfig from "./Element/Validation/FieldsValidationConfig";
import CollectionValidationConfig from "./Element/Validation/CollectionValidationConfig";
import FieldRules from "./Element/Validation/FieldValidation/FieldRules";
import CollectionUniqueRule from "../../Strategy/Validator/Strategy/Rules/CollectionUniqueRule";
import FormConfig from "./Element/FormConfig";

/**
 * Klasa konfiguracji kontekstu konta bankowego
 * @description bankAccount - powinien określać:
 * - *apiConfig*  - ustawienia Api backendowego
 * - *fields*     - konfigurację pól
 * - *item*       - ustawienia pojedynczego bankAccount
 * - *collection* - ustawienia kolekcji bankAccounts
 * - *validation* - reguły walidacji w kontekstach:
 *      1° **[fieldContext]** (fields rules):
 *          *required for offline validation*
 *          • **required** - czy jest niepuste
 *          • **type consistency** - czy zgadza się typ wartości
 *          • **value correctness** - czy wartość jest poprawna
 *      2° **[itemContext]** (how field depend on other fields in record)
 *          *required for offline validation*
 *          • np. isPartnership determinuje czy partnership jest required
 *      3° **[collectionContext]** (how fields depend on other items fields)
 *          *required for any validation*
 *          •
 *
 *
 * @implements FormConfigInterface
 *
 */
export default class BankAccountConfig extends FormConfigInterface {
    type = 'entity';
    /** @type {ApiConfig} = konfiguracja Api backendowego */
    apiConfig = new ApiConfig(
        'bank_accounts',
    );
    
    fields = {
        id:              new FieldConfig('hidden', 'id', 'ID', null),
        bankAccountName: new FieldConfig('text', 'bankAccountName', 'Nazwa konta bankowego', ''),
        accountNumber:   new FieldConfig('text', 'accountNumber', 'Numer konta', ''),
        bankName:        new FieldConfig('text', 'bankName', 'Nazwa banku', ''),
        isDefault:       new FieldConfig('checkbox', 'isDefault', 'Konto domyślne', false),
    };
    
    /** @type {ItemConfig} - konfiguracja encji  */
    item = new ItemConfig(
        'bankAccount',
        'Konto bankowe',
        'BankAccount',
        {
            type:           'radio',
            defaultChecked: 'isDefault',
            data:           {
                header: "bankAccountName",
                title:  "accountNumber",
                footer: null,
            },
            emptyValue:     {
                title: "Zaznacz domyślne",
            },
            actions:        {
                left:  {
                    delete: {
                        color:  'red',
                        label:  'Usuń',
                        icon:   'fad fa-trash',
                        action: 'bankAccount',//TODO: tu chyba trzbea machnąć jakiś callback
                    },
                },
                right: {
                    edit: {
                        color:  'orange',
                        label:  'Edytuj',
                        icon:   'fad fa-pencil',
                        action: 'bankAccount',
                    },
                },
            },
        },
    );
    
    collection = new CollectionConfig(
        'bankAccounts',
        'Konta bankowe',
        [],
        'bankAccount',
        {
            title:   {
                new:  'Nowe konto bankowe',
                edit: 'Edycja konta bankowego',
            },
            actions: {
                new: {
                    color:  'green',
                    label:  'Dodaj',
                    icon:   'fal fa-plus',
                    action: '/form/bankAccount/',
                },
            },
        },
        'company',
    );
    
    form = new FormConfig(
        'bankAccount',
        'sheet',
    );
    
    /**
     * Konfiguracja walidacji
     * @type {ValidationConfig}
     */
    validation = new ValidationConfig(
        new FieldsValidationConfig({
            id:              new FieldRules('number'),
            bankAccountName: new FieldRules('text', true),
            accountNumber:   new FieldRules('text', true),
            bankName:        new FieldRules('text', true),
            isDefault:       new FieldRules('checkbox'),
        }),
        new CollectionValidationConfig({
            bankAccountName: new CollectionUniqueRule(),
            accountNumber:   new CollectionUniqueRule(),
            // isDefault:       new CollectionRequiredValueRule(true), 
            // - should be validated when company form is submitted
        }),
    );
    
    data = null;
}