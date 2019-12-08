import FormConfigInterface from "./FormConfigInterface";
import ApiConfig from "./Element/ApiConfig";
import ItemConfig from "./Element/ItemConfig";
import FormConfig from "./Element/FormConfig";


/**
 * Klasa konfiguracji kontekstu właściciela
 *
 * @implements FormConfigInterface
 *
 */
export default class OwnerConfig extends FormConfigInterface {
    type = 'entity';
    
    /** @type {ApiConfig} = konfiguracja Api backendowego */
    apiConfig = new ApiConfig(
        'users',
    );
    
    fields;
    
    /** @type {ItemConfig} - konfiguracja encji  */
    item = new ItemConfig(
        'owner',
        'Właściciel',
        'User',
    );
    
    collection;
    
    form = new FormConfig(
        'owner',
        'item',
        'popup',
    );
    
    validation;
    
    data = null;
}