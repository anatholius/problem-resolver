/**
 * @property {Object} config - konfiguracja formularza
 * @property {FormConfigInterface} config.form - konfiguracja formularza
 * @property {Object} config.render - konfiguracja formularza
 * @property {Object} props - właściwości środowiska
 * @property {FormState} state - stan formularza
 * @property {FormContext} [origin] - kontekst pochodzenia
 */

export default class FormContext {
    /** @type Object */
    config = {
        form: null,
        render: null,
    };
    /** @type Object */
    props = null;
    /** @type FormState */
    state = null;
    /** @type FormContext */
    origin = null;
    
    /**
     * Form context ObjectValue class constructor
     *
     * @param {FormConfigInterface} config - konfiguracja formularza
     * @param {Object} [props] - właściwości środowiska
     * @param {FormState} [state] - stan formularza
     * @param {FormContext} [origin] - kontekst pochodzenia
     */
    constructor(config, props, state, origin = null) {
        this.config = config;
        this.props = props;
        this.state = state;
        if (origin) {
            this.origin = origin;
        }
    }
}