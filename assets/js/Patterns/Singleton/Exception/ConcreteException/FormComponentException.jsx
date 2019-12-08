import ExceptionAbstract from "../ExceptionAbstract";

/**
 * @class
 */
export default class FormComponentException extends ExceptionAbstract {
    displayName = 'FormComponentException';
    message = 'Nieznany błąd w klasie FormPrototypeProduct';
    messageSuffix = 'Sprawdź czy plik istnieje w folderze /assets/Patterns/Prototype/ConcretePrototype/FormPrototypeProduct/';
    
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