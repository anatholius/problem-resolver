import SwipeableItemWidgetProductAbstract from "./SwipeableItemWidgetProductAbstract";
import SwipeableItemWidgetException from "../../../../Singleton/Exception/ConcreteException/SwipeableItemWidgetException";
import SwipeableRadioItemWidget
    from "../../../../Prototype/ConcretePrototype/SwipeableItemWidget/SwipeableRadioItemWidget";
import SwipeableSimpleItemWidget
    from "../../../../Prototype/ConcretePrototype/SwipeableItemWidget/SwipeableSimpleItemWidget";
import SwipeableCheckboxItemWidget
    from "../../../../Prototype/ConcretePrototype/SwipeableItemWidget/SwipeableCheckboxItemWidget";

/**
 * @class SwipeableItemWidgetProduct
 * @name SwipeableItemWidgetProduct
 *
 * @memberOf WidgetAbstractFactory
 * @instance
 * @summary [wzorzec: Fabryka abstrakcyjna -> ConcreteFactory -> ConcreteProduct] - Zwraca prototyp SwipeableItemWidgetProduct
 * @returns WidgetPrototypeAbstract
 *
 * @description Fabryka produkująca prototyp itema
 * Prototypy itemów:
 * - simple - {@link SwipeableSimpleItemWidget}
 * - checkbox - {@link SwipeableCheckboxItemWidget}
 * - radio - {@link SwipeableRadioItemWidget}
 *
 * @param {string} prototype - nazwa prototypu (simple, checkbox, radio)
 * @param {Object} widgetConfig - konfiguracja widgetu
 *
 */
export default class SwipeableItemWidgetProduct extends SwipeableItemWidgetProductAbstract {
    displayName = 'SwipeableCollectionWidget';
    
    /**
     * @param prototype - nazwa prototypu pola
     * @param widgetConfig - konfiguracja widgetu
     *
     * @return {
     *      SwipeableSimpleItemWidget|
     *      SwipeableCheckboxItemWidget|
     *      SwipeableRadioItemWidget
     *      }
     */
    constructor(prototype, widgetConfig) {
        super(prototype);
        
        switch (prototype) {
            case 'simple':
                /** @return {SwipeableSimpleItemWidget} */
                return new SwipeableSimpleItemWidget(widgetConfig);
            case 'checkbox':
                /** @return {SwipeableCheckboxItemWidget} */
                return new SwipeableCheckboxItemWidget(widgetConfig);
            case 'radio':
                /** @return {SwipeableRadioItemWidget} */
                return new SwipeableRadioItemWidget(widgetConfig);
            default:
                throw new SwipeableItemWidgetException('Nieznany prototyp widgetu SwipeableItem !!!');
        }
    }
    
    
}