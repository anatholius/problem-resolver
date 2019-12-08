import FieldsValidationConfig from "./Validation/FieldsValidationConfig";
import FormValidationConfig from "./Validation/FormValidationConfig";
import CollectionValidationConfig from "./Validation/CollectionValidationConfig";

/**
 * Validation config should configure 3 areas:
 * ##1° fieldContext - ``(fields rules)``:
 *      *required for offline validation*
 *      • **required** - czy jest niepuste
 *      • **type consistency** - czy zgadza się typ wartości
 *      • **value correctness** - czy wartość jest poprawna
 *  ##2° itemContext - ``(how field depend on other fields in record)``
 *      *required for offline validation*
 *      np. isPartnership determinuje czy partnership jest required
 *      *Właściwie to ten przykład nie musi być walidowany, ponieważ załatwia go zachowanie kontrolek*
 *      *- Jeśli isPartnership to partnership jest włączony i wymagany*
 *      *- Jeśli nie isPartnership to partnership jest wyłączony i nawet nie trafia do walidacji*
 *  ##3° collectionContext - ``(how fields depend on other items fields)``
 *     *required for any validation*
 *     • np. __*isDefault*__ jest unikalne w kontekście kolekcji, tzn. może być tru tylko w jednym rekordzie
 *     • np. __*bankAccountName*__ jest unikalne w kontekście kolekcji, tzn. nie może się powtarzać w innych rekordach
 *     • np. __*accountNumber*__ jest unikalne w kontekście kolekcji, tzn. nie może się powtarzać w innych rekordach
 * @property {FieldsValidationConfig} fieldsRules - zasady walidacji pól
 * @property {FormValidationConfig} formRules - zasady walidacji pól w kontekście formularza
 * @property {CollectionValidationConfig} collectionRules - zasady walidacji pól w kontekście kolekcji
 */
export default class ValidationConfig {
    
    /**
     * Constructor of ValidationConfig
     *
     * @param {[]} [arguments] - role walidacji zdefiniowane klasami strategii
     */
    constructor() {
        // console.log('ValidationConfig.arguments', arguments);
        for (let rules of arguments) {
            if (rules instanceof FieldsValidationConfig) {
                //zasady walidacji pól
                this.fieldsRules = rules;
            } else if (rules instanceof FormValidationConfig) {
                //zasady walidacji pól w kontekście formularza
                this.formRules = rules;
            } else if (rules instanceof CollectionValidationConfig) {
                //zasady walidacji pól w kontekście kolekcji
                this.collectionRules = rules;
            }
        }
    }
    
}