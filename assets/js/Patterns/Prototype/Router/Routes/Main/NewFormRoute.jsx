import RouteConfig from "../../RouteConfig";

export default class NewFormRoute extends RouteConfig {
    _config;
    _context;
    
    name = 'new-form';
    path = '/form/:formName/';
    options = {};
    async;
    
    /**
     *
     * @param {string} name - nazwa routa
     * @param {string} path - ścieżka routa
     * @param {Object} [options] - opcje routa, np. {props:{}}
     */
    constructor(name, path, options) {
        super();
        
        this.name = name;
        this.path = path;
        if (options) {
            this.setOptions(options);
        }
        this.async = this._async.component;//(options ? options.api : null);
    }
    
    setOptions = (options) => {
        this.options = options;
    };
    
    resolveRoute(config) {
        return this._config;
    }
}