/**
 * @property {string} action
 * @property {string} name
 * @property {string} label
 * @property {string} emptyValue
 */
export default class FieldConfig {
    
    /** @type {string} - typ pola */
    type;
    /** @type {string} - nazwa pola */
    name;
    /** @type {string} - etykieta pola */
    label;
    /** @type {string} - pusta wartość */
    emptyValue;
    
    _widget;
    
    /**
     * @param type - typ
     * @param name - nazwa
     * @param label - label
     * @param emptyValue - pusta wartość
     * @param [additionalOptions] - dodatkowe opcje
     */
    constructor(type, name, label, emptyValue, additionalOptions = null) {
        this.type = type;
        this.name = name;
        this.label = label;
        this.emptyValue = emptyValue;
        if (additionalOptions) {
            for (let key in additionalOptions) {
                if (additionalOptions.hasOwnProperty(key)) {
                    this[key] = additionalOptions[key];
                }
            }
        }
    }
    
    acceptVisitor = (widgetFactoryCoordinator) => {
        // widgetFactoryCoordinator.visitField(this);
        widgetFactoryCoordinator.setFieldWidget(this);
    };
    
    setFieldWidget = (widget) => {
        this._widget = widget;
    }
}