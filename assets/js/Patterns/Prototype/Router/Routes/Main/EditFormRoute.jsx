import RouteConfig from "../../RouteConfig";

export default class EditFormRoute extends RouteConfig {
    _config;
    _context;
    
    name = 'edit-form';
    path = '/form/:formName/:id/';
    options = {};
    
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
        this.popup = {
            animate: true,
            async:   this._async.component(options ? options.api : null),
        };
    }
    
    setOptions = (options) => {
        this.options = options;
    };
    
    resolveRoute(config) {
        return this._config;
    }
}