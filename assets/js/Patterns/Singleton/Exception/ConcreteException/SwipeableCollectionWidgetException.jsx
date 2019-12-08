import ExceptionAbstract from "../ExceptionAbstract";

/**
 * @class
 */
export default class SwipeableCollectionWidgetException extends ExceptionAbstract {
    displayName = 'SwipeableCollectionWidgetException';
    message = 'Nieznany błąd w klasie SwipeableCollectionWidgetProduct';
    
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