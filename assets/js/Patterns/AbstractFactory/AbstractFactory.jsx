/** @namespace WidgetAbstractFactory */

/**
 * @class WidgetAbstractFactory
 * @name WidgetAbstractFactory
 *
 * @summary [wzorzec: Fabryka abstrakcyjna] - określa fabrykę do wyprodukowania widgetu
 * 
 * @description
 * #wzorzec: [Fabryka Abstrakcyjna]
 * ##Klasa abstrakcyjna do określenia konkretnej fabryki
 *
 * ###Konkretne fabryki:
 * - {@link FieldWidget} - fabryka widgetów pól formularza wg wzorca projektowego 'Prototyp'
 * - {@link SwipeableCollectionWidget} - fabryka widgetów kolekcji z przesuwnymi itemami
 * - {@link SwipeableItemWidget} - fabryka widgetów przesuwnych itemów
 *
 * @property {FormConfigInterface} formConfig - konfiguracja kontekstu formularza
 * @property {Object} [event] - obiekt eventów formularza
 * @property {Object} [handle] - obiekt handlerów formularza
 * @property {Object} [collections] - obiekt danych kolekcji wykorzystywanych w formularzu
 * @property {Object} [state] - obiekt stanu formularza
 */
export default class AbstractFactory {
    app;

    /**
     * @param {FormConfigInterface} config - konfiguracja kontekstu formularza
     */
    constructor() {
    }
    
    /**
     * Tworzy widget pola (FieldWidgetProduct) na podstawie prototypu o nazwie 'prototype'
     *
     * @param {string} prototype = '' - [ text | select  | datepicker | toggle | checkbox | radio | selectToggle | toggleText ]
     */
    createFieldWidget(prototype) {
    }
    
    /**
     * Tworzy widget listy kolekcji (SwipeableCollectionWidgetProduct) na podstawie prototypu o nazwie 'prototype'
     *
     * @param {string} prototype = {'card'|'accordion'|'list'}
     */
    createSwipeableCollectionWidget(prototype) {
    }

    setApp = (app) => {
        this.app = app;
    };
}