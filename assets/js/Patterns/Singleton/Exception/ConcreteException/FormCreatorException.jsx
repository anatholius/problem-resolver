import ExceptionAbstract from "../ExceptionAbstract";

/**
 * @class
 */
export default class FormCreatorException extends ExceptionAbstract {
    displayName = 'FormCreatorException';
    message = 'Nieznany błąd w klasie FormCreator';
    messageSuffix = 'Sprawdź funkcję co tam się dzieje';
    
    constructor(message, errorData) {
        super();
        
        if (message) {
            this.message = message;
        }
        if (errorData !== undefined) {
            console.warn('errorData:', errorData);
        }
        throw new Error(`[${this.displayName}]: ${this.message} 
${this.messageSuffix}`);
    }
    
}