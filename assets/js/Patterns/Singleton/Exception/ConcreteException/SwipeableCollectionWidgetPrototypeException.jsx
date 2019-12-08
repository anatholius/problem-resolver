import ExceptionAbstract from "../ExceptionAbstract";

/**
 * @class
 */
export default class SwipeableCollectionWidgetPrototypeException extends ExceptionAbstract {
    displayName = 'SwipeableCollectionWidgetPrototypeException';
    message = 'Nieznany błąd w klasie SwipeableCollectionWidgetPrototype';
    
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