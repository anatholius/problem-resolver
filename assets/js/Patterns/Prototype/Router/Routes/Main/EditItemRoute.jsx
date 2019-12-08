import RouteConfig from "../../RouteConfig";

export default class EditItemRoute extends RouteConfig {
    _config;
    _context;
    
    name = 'edit-item';
    path = '/collection/:formName/:index/';
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