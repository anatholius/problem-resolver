import ExceptionAbstract from "../ExceptionAbstract";

/**
 * @class
 */
export default class RoutesException extends ExceptionAbstract {
    displayName = 'RoutesException';
    message = 'Nieznany błąd w konfiguracji routingu.';
    messageSuffix = 'Sprawdż plik routes.js';
    
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