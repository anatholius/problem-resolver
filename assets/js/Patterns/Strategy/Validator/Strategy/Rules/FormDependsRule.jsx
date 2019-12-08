/**
 * Zasada walidacji pola formularza zależnego od wartości innego pola
 */
import {ResultRule} from "../RulesClass";
import FormDependsRuleException from "./Exceptions/FormDependsRuleException";

/**
 * @class
 * @name FormDependsRule
 * @description Klasa definiująca zasadę walidacji '*depends*' dla kontekstu '*form*'
 * @tutorial formDependsRule
 */
export default class FormDependsRule {
    displayName = 'FormDependsRule';
    when;
    then;

    /**
     * Określa rolę zależności w kontekście formularza
     *
     * @param {Object} when - struktura warunku roli
     * @param {Object} then - struktura akcji do wykonania dla spełnionego warunku
     */
    constructor(when, then) {
        this.when = when;
        this.then = then;
    }

    /**
     * #Algorytm walidacji zasady 'depends' dla formularza
     * Dane wejściowe:
     * - when - warunek który należy sprawdzić aby wykonać akcję sprawdzania docelowego pola
     * - then - walidacja docelowego pola
     *  @example
     *  when {
     *      field: ? - nazwa pola którego wartośc należy sprawdić
     *      value: ? - wartość pola które należy sprawdić
     *  }
     *  then = {
     *      required: ? - algorytm walidacji w kontekście 'field', e.g. checkRequired
     *  }
     * @param value
     * @param {Object} rule - zasady walidacji
     * @param {Object} formData - dane całego formularza do wykorzystania przez zasady walidacji
     *
     * @return {Object} - zwraca wartość wyliczoną wg funkcji wykonującej prostą walidację na polu formularza
     * @tutorial /assets/docs/tutorials/formDependsRule.algorithm
     * Nazwa tej funkcji to translacje indeksu w this.then:
     * - required - wykonuje funkcję Rules._field.checkRequired(whenResult)
     *
     */
    algorithm = (value, rule, formData) => {
        // Log.intention([this.displayName,
        //     `Mamy dane:`,
        //     `value="${value}"`,
        //     `rule`, rule,
        //     `formData`, formData,
        // ]);
        const whenResult = formData[this.when.field] === this.when.value;
        const algorithmResult = new ResultRule('depends');
        console.log('whenResult', whenResult);
        if (whenResult) {
            return (fieldFunctions) => {
                const fieldChecker = Object.keys(this.then)[0];
                //TODO: fix with new helper in app
                // const fieldValidationResult = fieldFunctions[`check${Helper.ucfirst(fieldChecker)}`](value, this.then[fieldChecker]);
                const fieldValidationResult = `fieldChecker`;

                if (!fieldValidationResult) {
                    switch (fieldChecker) {
                        case 'type':
                            algorithmResult.setError(`To pole ma niewłaściwy typ danych`);
                            break;
                        case 'required':
                            algorithmResult.setError(`To pole jest wymagane`);
                            break;
                        case 'correctness':
                            algorithmResult.setError(`To pole ma nieprawidłową wartość`);
                            break;
                        default:
                            throw new FormDependsRuleException(`Niezdefiniowany algorytm`, fieldChecker);
                    }
                }
                return algorithmResult.getAnswer();
            };
        } else {
            return () => {
                return algorithmResult.getAnswer();
            };
        }
    };
}