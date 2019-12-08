/**
 * #Konfiguracja walidacji w kontekście formularza
 * ##Role walidacji:
 * - depended - pole formularza jest zależne od innego
 *
 * @property {Object} [...arguments] - typ pola role validacji zdefiniowane obiektami klas ról
 * @see FormDependsRule
 *
 * @description **Warunki walidacji dla formularza:**
 * Każdy argument przekazany do konstruktora klasy powinien być instancją klasy roli
 * see: /App/Api/Component/ValidationRules/*
 */
export default class FormValidationConfig {
    rules = [];
    
    /**
     * Konfiguracja walidacji pola w kontekście formularza
     *
     * @param {Object} [arguments] - role validacji zdefiniowane obiektami klas ról
     */
    constructor() {
        // console.log('arguments', arguments);
        
        //należy uwzględnić dowolną iloś argumentów/ról
        for (let rule of arguments) {
            this.rules.push(rule);
        }
    }
}