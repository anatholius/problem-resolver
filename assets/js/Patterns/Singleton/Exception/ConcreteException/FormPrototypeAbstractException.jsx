import ExceptionAbstract from "../ExceptionAbstract";

/**
 * @class
 */
export default class FormPrototypeAbstractException extends ExceptionAbstract {
    displayName = 'FormPrototypeAbstractException';
    message = 'Nieznany błąd w klasie FormPrototypeProduct';
    messageSuffix = 'Sprawdź funkcję createFormComponent w pliku' +
        ' /assets/js/App/Patterns/Prototype/FormPrototypeAbstract.jsx';
    
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