import ExceptionAbstract from "../ExceptionAbstract";

/**
 * @class
 */
export default class SwipeableCollectionCardWidgetException extends ExceptionAbstract {
    displayName = 'SwipeableCollectionCardWidgetException';
    message = 'Nieznany błąd w klasie SwipeableCollectionCardWidget';
    
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