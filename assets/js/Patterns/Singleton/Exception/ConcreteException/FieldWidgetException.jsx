import ExceptionAbstract from "../ExceptionAbstract";

/**
 * @class
 */
export default class FieldWidgetException extends ExceptionAbstract {
    displayName = 'FieldWidgetException';
    message = 'Nieznany błąd w klasie FieldWidgetProduct';
    
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