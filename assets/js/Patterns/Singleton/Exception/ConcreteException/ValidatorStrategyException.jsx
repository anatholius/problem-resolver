import ExceptionAbstract from "../ExceptionAbstract";

/**
 * @class
 */
export default class ValidatorStrategyException extends ExceptionAbstract {
    displayName = 'ValidatorStrategyException';
    message = 'Nieznany błąd w klasie FormPrototypeProduct';
    messageSuffix = 'Sprawdź czy właściwość validation w pliku kontekstu dla formularza';
    
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