import ExceptionAbstract from "../ExceptionAbstract";

/**
 * @class
 */
export default class FormPrototypeException extends ExceptionAbstract {
    displayName = 'FormPrototypeException';
    message = 'Nieznany błąd w klasie FormPrototype';
    messageSuffix = 'Sprawdź funkcję createFormComponent w pliku' +
        ' /assets/js/App/Patterns/Prototype/FormPrototype.jsx';
    
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