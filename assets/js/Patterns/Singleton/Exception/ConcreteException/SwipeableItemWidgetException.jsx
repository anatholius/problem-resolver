import ExceptionAbstract from "../ExceptionAbstract";

/**
 * @class
 */
export default class SwipeableItemWidgetException extends ExceptionAbstract {
    displayName = 'SwipeableItemWidgetException';
    message = 'Nieznany błąd w klasie SwipeableItemWidgetProduct';
    
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