import ExceptionAbstract from "../ExceptionAbstract";

/**
 * @class
 */
export default class ValidatorConfigException extends ExceptionAbstract {
    displayName = 'ValidatorConfigException';
    message = 'Nieznany błąd w klasie FormPrototypeProduct';
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