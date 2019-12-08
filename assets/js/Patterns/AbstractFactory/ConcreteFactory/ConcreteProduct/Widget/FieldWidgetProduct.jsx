import FieldWidgetProductAbstract from "./FieldWidgetProductAbstract";
import FieldWidgetException from "../../../../Singleton/Exception/ConcreteException/FieldWidgetException";
import TextFieldWidget from "../../../../Prototype/ConcretePrototype/FieldWidget/TextFieldWidget";
import SelectFieldWidget from "../../../../Prototype/ConcretePrototype/FieldWidget/SelectFieldWidget";
import RadioFieldWidget from "../../../../Prototype/ConcretePrototype/FieldWidget/RadioFieldWidget";
import SelectToggleFieldWidget from "../../../../Prototype/ConcretePrototype/FieldWidget/SelectToggleFieldWidget";
import DatepickerFieldWidget from "../../../../Prototype/ConcretePrototype/FieldWidget/DatepickerFieldWidget";
import SelectCollectionFieldWidget
    from "../../../../Prototype/ConcretePrototype/FieldWidget/SelectCollectionFieldWidget";
import CheckboxFieldWidget from "../../../../Prototype/ConcretePrototype/FieldWidget/CheckboxFieldWidget";
import ToggleFieldWidget from "../../../../Prototype/ConcretePrototype/FieldWidget/ToggleFieldWidget";
import TextToggleFieldWidget from "../../../../Prototype/ConcretePrototype/FieldWidget/TextToggleFieldWidget";

/**
 * Zwraca instancję protorypu widgetu pola formularza o podanej nazwie
 * @class FieldWidgetProduct
 * @memberOf WidgetAbstractFactory
 * @instance
 * @summary [wzorzec: Fabryka abstrakcyjna -> ConcreteFactory -> ConcreteProduct] - Zwraca prototyp FieldWidgetProduct
 * @returns WidgetPrototypeAbstract
 */
export default class FieldWidgetProduct extends FieldWidgetProductAbstract {
    displayName = 'FieldWidgetProduct';
    
    /**
     * @param prototype - nazwa prototypu pola
     * @param formConfig - konfiguracja formularza
     *
     * @return {TextToggleFieldWidget|SelectCollectionFieldWidget|SelectToggleFieldWidget|CheckboxFieldWidget|ToggleFieldWidget|RadioFieldWidget|DatepickerFieldWidget|SelectFieldWidget|TextFieldWidget}
     */
    constructor(prototype, formConfig) {
        super(prototype);
        
        switch (prototype) {
            case 'text':
                /** @return {TextFieldWidget} */
                return new TextFieldWidget(formConfig);
            case 'textToggle':
                /** @return {TextToggleFieldWidget} */
                return new TextToggleFieldWidget(formConfig);
            case 'select':
                /** @return {SelectFieldWidget} */
                return new SelectFieldWidget(formConfig);
            case 'selectToggle':
                /** @return {SelectToggleFieldWidget} */
                return new SelectToggleFieldWidget(formConfig);
            case 'selectCollection':
                /** @return {SelectCollectionFieldWidget} */
                return new SelectCollectionFieldWidget(formConfig);
            case 'datepicker':
                /** @return {DatepickerFieldWidget} */
                return new DatepickerFieldWidget(formConfig);
            case 'toggle':
                /** @return {ToggleFieldWidget} */
                return new ToggleFieldWidget(formConfig);
            case 'checkbox':
                /** @return {CheckboxFieldWidget} */
                return new CheckboxFieldWidget(formConfig);
            case 'radio':
                /** @return {RadioFieldWidget} */
                return new RadioFieldWidget(formConfig);
            default:
                throw new FieldWidgetException('Nieznany prototyp widgetu Field !!!');
        }
        
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
    
}