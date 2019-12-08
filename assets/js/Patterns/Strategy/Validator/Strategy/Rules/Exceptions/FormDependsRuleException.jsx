import ExceptionAbstract from "../../../../../Singleton/Exception/ExceptionAbstract";

/**
 * @extends ExceptionAbstract
 */
export default class FormDependsRuleException extends ExceptionAbstract {
    displayName = 'FormDependsRuleException';
    message = 'Nieznany błąd w klasie FormDependsRuleException';
    messageSuffix = 'Sprawdź właściwość validation w pliku kontekstu dla formularza';

    constructor(message, errorData) {
        super();
        if (message) {
            this.message = message;
        }
        if (errorData !== undefined) {
            console.log('errorData:', errorData);
        }
        throw new Error(`[${this.displayName}]: ${this.message} 
${this.messageSuffix}`);
    }
}