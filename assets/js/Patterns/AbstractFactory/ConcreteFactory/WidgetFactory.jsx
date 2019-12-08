import AbstractFactory from "../AbstractFactory";

import FieldWidgetProduct from "./ConcreteProduct/Widget/FieldWidgetProduct";
import SwipeableCollectionWidgetProduct from "./ConcreteProduct/Widget/SwipeableCollectionWidgetProduct";
import SwipeableItemWidgetProduct from "./ConcreteProduct/Widget/SwipeableItemWidgetProduct";

/**
 * @class WidgetFactory
 * @name WidgetFactory
 * @memberOf AbstractFactory
 *
 * @summary [wzorzec: Fabryka abstrakcyjna -> ConcreteFactory] - produkuje widgety wg klas konkretnych fabryk
 * @description
 * #wzorzec: [Fabryka]
 * ##Fabryka widgetów
 * Może tworzyć widgety:
 * - {@link FieldWidgetProduct}
 * - {@link SwipeableCollectionWidgetProduct}
 * - {@link SwipeableItemWidgetProduct}
 *
 * @property {FormConfigInterface} formConfig - konfiguracja kontekstu formularza
 * @property {Object} [handle] - obiekt handlerów formularza
 * @property {Object} [event] - obiekt eventów formularza
 * @property {Object} [collections] - obiekt danych kolekcji wykorzystywanych w formularzu
 * @property {Object} [state] - obiekt stanu formularza
 */
export default class WidgetFactory extends AbstractFactory {
    /** @type {FormConfigInterface} */
    formConfig;
    /** @type {Object} */
    handle;
    /** @type {Object} */
    event;
    /** @type {Object} */
    collections;
    /** @type {Object} */
    state;

    _allowedTypes = [
        'text',
        'select',
        'datepicker',
        'toggle',
        'checkbox',
        'radio',
        'selectToggle',
        'selectCollection',
        'textToggle',
        'collection',
    ];

    /**
     *
     * @param {FormConfigInterface} formConfig - konfiguracja kontekstu formularza
     * @param {Object} [event] - obiekt eventów formularza
     * @param {Object} [handle] - obiekt handlerów formularza
     * @param {Object} [collections] - obiekt danych kolekcji wykorzystywanych w formularzu
     * @param {Object} [state] - obiekt stanu formularza
     */
    constructor(handle, event, collections, state) {
        super();

        this._setFormHandlers(handle);
        this._setFormEvents(event);

        this.state = state;
        if (collections) {
            this.collections = collections;
        }

    }



    allowedType = (type) => {
        return this._allowedTypes.indexOf(type) !== -1;
    };

    /**
     * @description ##Mozliwe wartości
     * @example ###prototype:
     *      'text' - prototyp widgetu pola typu "text"
     *      'select' - prototyp widgetu pola typu "select"
     *      'datepicker' - prototyp widgetu pola typu "date"
     *      'toggle' - prototyp widgetu pola typu "toggle"
     *      'checkbox' - prototyp widgetu pola typu "checkbox"
     *      'radio' - prototyp widgetu pola typu "radio"
     *      'selectToggle' - prototyp widgetu pola typu "select" (wł/wył)
     *      'textToggle' - prototyp widgetu pola typu "text" (wł/wył)
     * @param {string} prototype - rodzaj prototypu
     *
     * @return {inherited} - Zwraca prototyp widgetu pola danego typu
     */
    createFieldWidget(prototype) {
        return new FieldWidgetProduct(prototype, {
            formConfig: this.formConfig,
            event: this.event,
            handle: this.handle,
            collections: this.collections,
            state: this.state,
        });
    }

    /**
     * @description ##Mozliwe wartości
     * @example ###prototype:
     *      'card' - prototyp widgetu kolekcji typu "card"
     *      'accordion' - prototyp widgetu kolekcji typu "accordion"
     *      'list' - prototyp widgetu kolekcji typu "list"
     * @param {string} prototype - rodzaj prototypu
     *
     * @param prototype
     * @returns {
     *      WidgetPrototype.SwipeableCollectionListWidget|
     *      SwipeableCollectionCardWidget|
     *      WidgetPrototype.SwipeableCollectionAccordionWidget
     * }- Zwraca prototyp widgetu pola danego typu
     */
    createSwipeableCollectionWidget(prototype) {



        const swipeableCollectionWidget = new SwipeableCollectionWidgetProduct(prototype, this.app);
        swipeableCollectionWidget.setConfig(this.formConfig);
        swipeableCollectionWidget.setHandlers(this.handle);
        swipeableCollectionWidget.setEvents(this.event);
        return swipeableCollectionWidget.getProduct();

        // ,{
        //     formConfig: this.formConfig,
        //     event: this.event,
        //     handle: this.handle,
        //     collections: this.collection,
        // });
    }

    /**
     * @description ##Mozliwe wartości
     * @example ###prototype:
     *      'item' - prototyp widgetu itemu przesuwnego typu 'item'
     *      'checkbox' - prototyp widgetu elementu przesuwnego typu "checkbox"
     *      'radio' - prototyp widgetu elementu przesuwnego typu "radio"
     * @param {string} prototype - nazwa prototypu widgetu pozycji kolekcji
     *
     * @return {SwipeableItemWidgetProduct} - Zwraca prototyp widgetu pola danego typu
     */
    createSwipeableItemWidget(prototype) {
        return new SwipeableItemWidgetProduct(prototype, {
            formConfig: this.formConfig,
            event: this.event,
            handle: this.handle,
            collection: this.collection,
        });
    }

}