export class ValidatorRulesException {
    displayName = 'ValidatorRulesException';
    message = 'Coś jest nie tak';

    constructor(message, errorData) {
        if (message) {
            this.message = message;
        }
        if (errorData !== undefined) {
            console.log('errorData:', errorData);
        }
        throw new Error(`[${this.displayName}]: ${this.message}`);
    }
}

export class RuleException {
    displayName = 'RulesException';
    message = 'Coś jest nie tak';

    constructor(message, errorData) {
        if (message) {
            this.message = message;
        }
        if (errorData !== undefined) {
            console.log('errorData:', errorData);
        }
        throw new Error(`[${this.displayName}]: ${this.message}`);
    }
}

/**
 * Klasa definiująca interfejs odpowiedzi walidacji roli
 */
export class ResultRule {
    rule;
    success = true;
    message = '';

    constructor(ruleName) {
        this.rule = ruleName;
    }

    /**
     * Ustawia komunikat błędu
     *
     * @param {string} message
     */
    setError = (message) => {
        this.message = message;
        this.success = false;
    };

    getAnswer = () => {
        if (this.success) {
            // Log.success(this.success);
            return {
                success: this.success,
            };
        } else {
            // Log.error(this.message);
            return {
                success: this.success,
                message: this.message,
            };
        }
    }
}

export default class ValidationRules {
    displayName = 'ValidationRules';
    rules = [];

    /**
     * Wykonuje walidację roli
     *
     * @description Waliduje wartość w określonym kontekście wg zdefiniowanej zasady
     *
     * @param {string} contextName - kontekst zasady (field, form, collection)
     * @param {string} rule - nazwa zasady
     * @param {string} value - wartość do sprawdzenia
     * @param {Object} expected - wartość oczekiwana
     * @param {Object} [contextData] - obiekt z danymi kontekstu sprawdzania
     * @return {boolean} - wartość logiczna sprawdzenia
     * @throws ValidatorRulesException
     */
    validateRule = (contextName, rule, value, expected, contextData) => {
        switch (contextName) {
            case 'field': {
                switch (rule) {
                    case 'type':
                        return this._field.checkType(value, expected);
                    case 'required':
                        return this._field.checkRequired(value, expected);
                    case 'correctness':
                        return this._field.checkCorrectness(value, expected);
                    default:
                        throw new ValidatorRulesException(`Cannot validate rule without rule !!!`);
                }
            }
            case 'form': {
                if (contextData === undefined) {
                    throw new ValidatorRulesException(`Cannot validate form rules without 'contextData' !!!`);
                }
                switch (rule) {
                    case 'depends':
                        //config znajduje się w zmiennej expected
                        return this._form.checkDepends(value, expected, contextData);
                    case 'test':
                        break;
                    default:
                        throw new ValidatorRulesException(`Cannot validate rule without rule !!!`);
                }
                break;
            }
            case 'collection': {
                if (contextData === undefined) {
                    throw new ValidatorRulesException(`Cannot validate collection rules without 'contextData' !!!`);
                }
                // Log.info({
                //     inputData: {
                //         context: context,
                //         rule: rule,
                //         value: value,
                //         expected: expected,
                //         contextData: contextData,
                //     },
                // });

                switch (rule) {
                    case 'required':
                        return this._collection.checkRequired(value, expected, contextData);
                    case 'unique':
                        return this._collection.checkUnique(value, expected, contextData);
                    case 'requiredValue':
                        return this._collection.checkRequiredValue(value, expected, contextData);
                    default:
                        throw new ValidatorRulesException(`Cannot validate rule without rule !!!`);
                }
            }
            default:
                throw new Error(`Undefined contextName ${contextName}`);
        }
    };

    _field = {
        /**
         * Sprawdza zgodność typu wartości z wartością oczekiwaną
         *
         * @param value - wartość do sprawdzenia
         * @param expected - wartość oczekiwana
         * @return {boolean} boolean - wartość logiczna sprawdzenia
         * @private
         */
        checkType: (value, expected) => {
            let translatedType = null;
            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    if (value[0] instanceof Date) {
                        translatedType = 'date';
                    } else {
                        translatedType = 'collection';
                    }
                }
            } else if (typeof value === 'string') {
                translatedType = 'text';
            } else if (typeof value === 'boolean') {
                translatedType = 'checkbox';
            } else if (value === undefined) {
                translatedType = null;
            } else {
                translatedType = typeof value;
            }
            return translatedType === expected || translatedType === null;
        },

        /**
         * Sprawdza czy wartość 'value' posiada zawartość zgodnie oczekiwaniem expected
         *
         * @param value - wartość do sprawdzenia
         * @param expected - wartość oczekiwana
         * @return {boolean} - wartość logiczna sprawdzenia
         * @private
         */
        checkRequired: (value, expected) => {
            console.log('value', value);
            console.log('expected', expected);
            console.log('checking Required for field result:', (value !== "" && value !== null) === expected || expected === undefined);
            return (value !== "" && value !== null) === expected || expected === undefined;
        },

        /**
         * TODO: Zaimplementować kiedy będzie potrzebne
         *
         * @param value
         * @param expected
         * @return {boolean}
         */
        checkCorrectness: (value, expected) => {
            console.error('TODO: sprawdzanie poprawności wartości');
            return typeof value === expected;
        },
    };

    _form = {
        /**
         * Waliduje formularz zgodnie ze zdefiniowanymi zasadami
         *
         * @param value
         * @param {Object} rule - zasady walidacji
         * @param {Object} formData - dane całego formularza do wykorzystania przez zasady walidacji
         */
        checkDepends: (value, rule, formData) => {
            // Log.intention([this.displayName,
            //     `Mamy dane:`,
            //     `value="${value}"`,
            //     `rule`, rule,
            //     `formData`, formData,
            //     `.. i co dalej?`,
            //     `Zasada powinna zawierać:`,
            //     `warunek - when`, rule['when'],
            //     `oraz akcję do sprawdzenia na bieżącym polu - then`, rule['then'],
            //     `zatem sprawdzenie będzie polegać na wykonaniu warunku`,
            //     `i przy jego spełnieniu sprawdzić czy rola dla pola (this._field.check(what?)) jest valid`,
            //     `...`,
            //     `więc żeby uprościć proces analizy oraz`,
            //     `właściwie udokumentować dowolnie skomplikowaną zasadę`,
            //     `definicję - algorytm (funkcję realizującą) powinniśmy umieścić razem z konfiguracją zasady`,
            //     `powinna ona być pod sprytnym skrótem rule.algorithm:`, rule.algorithm,
            //     `...`,
            //     `a wogóle znamy tutja this._field`, this._field,
            // ]);

            return rule.algorithm(value, rule, formData)(this._field);
        },
    };

    _collection = {
        /**
         *
         * @param value
         * @param {CollectionRequiredRule} rule - obiekt zasady walidacji
         * @param {Object} contextData - obiekt zawierający nazwę pola oraz dane kolekcji
         * @return {Object} - obiekt rezultatu wykonania algorytmu walidacji zasady
         */
        checkRequired: (value, rule, contextData) => {
            const algorithmResult = rule.algorithm(value, contextData);
            console.log('Collection.checkRequired algorithmResult=', algorithmResult);
            return algorithmResult;
        },
        /**
         *
         * @param value - wartość do sprawdzenia spłeniania zasady
         * @param {CollectionUniqueRule} rule - obiekt zasady
         * @param {Object} contextData - obiekt zawierający nazwę pola oraz dane kolekcji
         * @return {Object} - obiekt rezultatu wykonania algorytmu walidacji zasady
         */
        checkUnique: (value, rule, contextData) => {
            const algorithmResult = rule.algorithm(value, contextData);
            console.log('Collection.checkUnique algorithmResult=', algorithmResult);
            return algorithmResult;
        },
        /**
         *
         * @param value
         * @param {CollectionRequiredRule} rule - obiekt zasady walidacji
         * @param {Object} contextData - obiekt zawierający nazwę pola oraz dane kolekcji
         * @return {Object} - obiekt rezultatu wykonania algorytmu walidacji zasady
         */
        checkRequiredValue: (value, rule, contextData) => {
            const algorithmResult = rule.algorithm(value, contextData);
            console.log('Collection.checkRequiredValue algorithmResult=', algorithmResult);
            return algorithmResult;
        },
    };
}