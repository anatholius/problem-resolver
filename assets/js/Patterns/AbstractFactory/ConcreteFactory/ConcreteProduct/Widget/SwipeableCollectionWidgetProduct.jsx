import SwipeableCollectionWidgetProductAbstract from "./SwipeableCollectionWidgetProductAbstract";
import SwipeableCollectionWidgetException
    from "../../../../Singleton/Exception/ConcreteException/SwipeableCollectionWidgetException";
import SwipeableCollectionCardWidget
    from "../../../../Prototype/ConcretePrototype/SwipeableCollectionWidget/SwipeableCollectionCardWidget";
import SwipeableCollectionAccordionWidget
    from "../../../../Prototype/ConcretePrototype/SwipeableCollectionWidget/SwipeableCollectionAccordionWidget";
import SwipeableCollectionListWidget
    from "../../../../Prototype/ConcretePrototype/SwipeableCollectionWidget/SwipeableCollectionListWidget";

/**
 * Zwraca instancję protorypu widgetu kolekcji o podanej nazwie
 * @class SwipeableCollectionWidgetProduct
 * @memberOf WidgetAbstractFactory
 * @instance
 * @summary [wzorzec: Fabryka abstrakcyjna -> ConcreteFactory -> ConcreteProduct] - Zwraca prototyp
 * SwipeableCollectionWidgetProduct
 * @returns WidgetPrototypeAbstract
 */
export default class SwipeableCollectionWidgetProduct extends SwipeableCollectionWidgetProductAbstract {
    displayName = 'SwipeableCollectionWidgetProduct';
    _config;
    _handlers;
    _events;
    app;

    /**
     * @param prototype - nazwa prototypu pola
     * @param app
     */
    constructor(prototype, app) {
        super(prototype,app);

    }

    setConfig = (config) => {
        this._config = config;
    };
    setHandlers = (handlers) => {
        this._handlers = handlers;
    };
    setEvents = (events) => {
        this._events = events;
    };

    /**
     *
     * @returns {
     *      WidgetPrototype.SwipeableCollectionListWidget|
     *      SwipeableCollectionCardWidget|
     *      WidgetPrototype.SwipeableCollectionAccordionWidget
     *      }
     */
    getProduct = () => {


        let product = null;
        switch (this._prototype) {
            case 'card':
                /** @return {SwipeableCollectionCardWidget} */
                product = new SwipeableCollectionCardWidget(this._config, this.app);
                break;
            case 'accordion':
                /** @return {SwipeableCollectionAccordionWidget} */
                product = new SwipeableCollectionAccordionWidget(this._config);
                break;
            case 'list':
                /** @return {SwipeableCollectionListWidget} */
                product = new SwipeableCollectionListWidget(this._config);
                break;
            default:
                throw new SwipeableCollectionWidgetException(`Nieznany prototyp '${this._prototype}' widgetu SwipeableCollection !!!`);
        }
        product.setHandlers(this._handlers);
        product.setEvents(this._events);
        return product;
    };
}