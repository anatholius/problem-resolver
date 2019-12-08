/** @namespace WidgetPrototype */

/**
 * Klasa abstrakcyjna WidgetPrototypeAbstract
 * @class WidgetPrototypeAbstract
 * @summary [wzorzec: Prototype]
 */
export default class WidgetPrototypeAbstract {
    displayName = 'WidgetPrototypeAbstract';
    config;
    app;
    
    constructor(config, app) {
        this.config = config;
        this.app = app;
    }
    
    /**
     * @return {WidgetPrototypeAbstract}
     */
    prototypeInstance = () => {
        return this._clone();
    };
    
    /**
     * Ustawia właściwość obiektu
     *
     * @param property
     * @param value
     */
    setProperty = (property, value) => {
        this[property] = value;
    };
    
    /**
     * Kopiuje właściwości prototypu do klona
     *
     * @return {WidgetPrototypeAbstract}
     */
    _clone = () => {
        let widget = new this.constructor(this.config);
        let keys = Object.keys(this);
        keys.forEach(k => {
            widget.setProperty(k, this[k]);
        });
        widget.app = this.app;

        return widget;
    }
}