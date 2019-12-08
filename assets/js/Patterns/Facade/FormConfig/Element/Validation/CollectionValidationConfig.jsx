/**
 * @name CollectionValidationConfig
 *
 * #Konfiguracja walidacji w kontekście kolekcji
 * ##Role walidacji:
 * - unique - see {@link CollectionUniqueRule}
 *
 * @property {Object} [...arguments] - typ pola role validacji zdefiniowane obiektami klas ról
 *
 * @description **Warunki walidacji dla formularza:**
 * Każdy argument przekazany do konstruktora klasy powinien być instancją klasy roli
 * see: ({@link /App/Api/Component/ValidationRules/} folder)
 */
export default class CollectionValidationConfig {
    rules = [];
    
    /**
     * Konfiguracja walidacji pola w kontekście formularza
     *
     * @param {[]} [arguments] - role validacji zdefiniowane obiektami klas ról
     * @see CollectionUniqueRule
     */
    constructor() {
        // console.log('arguments', arguments);
        
        //należy uwzględnić dowolną iloś argumentów/ról
        for (let rule of arguments) {
            this.rules.push(rule);
        }
    }
}