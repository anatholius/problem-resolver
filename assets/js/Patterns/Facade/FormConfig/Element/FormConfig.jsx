/**
 * @property {string} name
 * @property {string} type - (item, collection)
 * @property {string} decorator
 */
export default class FormConfig {
    /** @type {string} - nazwa formularza */
    name = "";
    /** @type {string} - typ formularza - może to być item lub collection */
    type = "";
    /** @type {Object} - konfiguracja widoku formularza */
    decorator = {};
    
    /**
     * @param {string} name
     * @param {string} type
     * @param {string} decorator
     */
    constructor(name, type, decorator) {
        this.name = name;
        this.type = type;
        this.decorator = decorator;
    }
    
}