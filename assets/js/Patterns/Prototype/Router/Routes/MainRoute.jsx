import RouteConfig from "../RouteConfig";
import NewFormRoute from "./Main/NewFormRoute";
import EditFormRoute from "./Main/EditFormRoute";
import EditItemRoute from "./Main/EditItemRoute";

export default class MainRoute extends RouteConfig {
    _config;
    _context;
    
    name = 'kpir';
    path = '/';
    options = {};
    master = true;
    detailRoutes = [
        new NewFormRoute('new-form', '/form/:fromName/'),
        new EditFormRoute('edit-form', '/form/:fromName/:id/'),
        new EditItemRoute('edit-item', '/collection/:fromName/:index/'),
    ];
    
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
    }
    
    setOptions = (options) => {
        this.options = options;
    };
    
    resolveRoute(config) {
        return this._config;
    }
}