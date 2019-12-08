/**
 * @property {string} name
 * @property {string} title
 * @property {string|array} emptyValue
 * @property {string} formName
 * @property {string} [parentForm]
 */
export default class CollectionConfig {
    /** @type {string} - nazwa kolekcji */
    name = "";
    /** @type {string} - tytuł kolekcji */
    title = "";
    /** @type {string|array} emptyValue - domyślna wartość */
    emptyValue = "";
    /** @type {string} - nazwa formularza kolekcji */
    formName = "";
    /** @type {string|null} - nazwa formularza nadrzędnego */
    parentForm = null;
    /** @type {Object} - konfiguracja widoku formularza */
    preview = {};
    
    /**
     * @param {string} name
     * @param {string} title
     * @param {string|array} emptyValue
     * @param {string} formName
     * @param {string} preview
     * @param {string} [parentForm]
     */
    constructor(name, title, emptyValue, formName, preview, parentForm) {
        this.name = name;
        this.title = title;
        this.emptyValue = emptyValue;
        this.formName = formName;
        this.preview = preview;
        this.parentForm = parentForm;
    }
    
}