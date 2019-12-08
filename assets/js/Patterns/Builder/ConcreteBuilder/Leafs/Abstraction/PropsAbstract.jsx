/**
 * @abstract
 *
 * @property {string} type - typ
 * @property {string} name - nazwa
 * @property {string} label - etykieta
 * @property {string} defaultValue - wartość domyślna
 * @property {string} [placeholder] - wartość zastępcza
 * @property {boolean} [disabled] - wł/wył
 * @property {string} [value] - wartość
 * @property {function} [onChange] - funkcja obsługi zmiany
 * @property {string|Array} [errorMessage] - komunikat błędu
 * @property {string} [errorMessageForce] - forsowanie konukatu błędu
 */
export default class PropsAbstract {
    type = 'text';
    name = '';
    label = '';
    placeholder = '';
    disabled = false;
    defaultValue = '';
    value = '';
    onChange;
    errorMessage = '';
    errorMessageForce = '';
    wrapperClass = [];
    data = {};
}