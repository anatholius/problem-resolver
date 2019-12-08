import PropsAbstract from "./PropsAbstract";

/**
 * @extends PropsAbstract
 *
 * @param {string} type - typ
 * @param {string} name - nazwa
 * @param {string} label - etykieta
 * @param {string} defaultValue - wartość domyślna
 * @param {string} [placeholder] - wartość zastępcza
 * @param {boolean} [disabled] - wł/wył
 * @param {string} [value] - wartość
 * @param {function} [onChange] - funkcja obsługi zmiany
 * @param {string|Array} [errorMessage] - komunikat błędu
 * @param {string} [errorMessageForce] - forsowanie konukatu błędu
 * @param {Array} [wrapperClass] - klasa wrappera
 * @param {Object} [data] - dane formularza
 */
export default class Props extends PropsAbstract {
    
    constructor(
        type,
        name,
        label,
        defaultValue,
        placeholder,
        disabled,
        value,
        onChange,
        errorMessage,
        errorMessageForce,
        wrapperClass,
        data,
    ) {
        super();
        this.type = type;
        this.name = name;
        this.label = label;
        this.defaultValue = defaultValue;
        this.placeholder = placeholder;
        this.disabled = disabled;
        this.value = value;
        this.onChange = onChange;
        this.errorMessage = errorMessage;
        this.errorMessageForce = errorMessageForce;
        this.wrapperClass = wrapperClass;
        this.data = data;
        
    }
}