
export default class FormState {
    displayName = 'FormState';
    /** @type {Object} */
    form = {};
    
    /**
     *
     * @param {string} formName - nazwa formularza
     * @param {FormConfigInterface} [formConfig] - konfiguracja formularza
     */
    constructor(formName, formConfig) {
        //TODO: do it if helper will be in app
        // this.displayName = `${Helper.ucfirst(formName)}State`;
        this._initialState(formConfig);
    }
    
    /**
     * @param {FormConfigInterface} formConfig
     * @private
     */
    _initialState = (formConfig) => {
        
    };
    
    set = (property, value) => {
        this[property] = value;
    };
    get = (property) => {
        return this[property];
    };
    has = (property) => {
        return !!this[property];
    };
}