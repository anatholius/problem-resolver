/**
 *
 * @property {string} name - Route name, e.g. home
 * @property {string} path - Route path. Means this route will be loaded when we click link that match to this path, or can be loaded by this path using API
 * @property {string} options - Object with additional route options (optional)
 * @property {string} routes - Array with nested routes
 * @property {string} viewName - View name where this route will be forced to load
 *
 * @property {string} master - Enables this route as Master route
 * @property {string} detailRoutes - Array with detail routes
 *
 * @property {string} modules - Array with Lazy Modules to load before route loading
 *
 * //content properties
 * @property {string} el -
 * @property {string} pageName -
 * @property {string} content -
 * @property {string} template -
 * @property {string} templateUrl -
 * @property {string} component - Load page from passed Framework7 Router Component
 * @property {string} componentUrl - load pages as a component via Ajax. Also supports dynamic route params from route path using {{paramName}} expression
 * @property {string} async - function(routeTo, routeFrom, resolve, reject) - Do required asynchronous manipulation and the return required route content and options
 * @property {string} asyncComponent - Method should return Promise resolved with Component or ES module with .default property containing Component.
 *
 * @property {string} tabs - Array with tab routes
 * @property {string} actions - Action Sheet route
 * @property {string} popup - Popup route
 * @property {string} loginScreen - Login screen route
 * @property {string} popover - Popover route
 * @property {string} sheet - Sheet route
 * @property {string} panel - Panel route
 *
 * @property {string} on - Object with event handlers
 *
 * @property {string} alias -
 * @property {string} redirect -
 *
 * @property {string} beforeEnter -
 * @property {string} beforeLeave -
 *
 * @property {string} keepAlive - Enables so called keepAlive route. When enabled then once loaded page and its component (Vue, React or Router component) will be never destroyed. Instead, it will be detached from DOM and reused again when required.
 *
 */
import FormCreator from "../../Command/FormCommander/FormCreator";

export default class RouteConfig {
    /** @abstract */
    name;
    /** @abstract */
    path;
    options;
    
    
    /**
     * @abstract
     * @type Object
     */
    _config = {
        component: null,
    };
    /**
     * @abstract
     * @type FormContext
     */
    _context = null;
    
    /**
     * @type {{component: (function(*=): Function)}}
     * @protected
     */
    _async = {
        component: (api) => {
            return (routeTo, routeFrom, resolve, reject) => {
                const props = {
                    api:      api,
                    formName: routeTo.params.formName,
                    id:       routeTo.params.id,
                };
                console.log('props',props);
                // const receiver = new RouteConfig(props);
                const receiver = this;
                const invoker = new FormCreator(receiver);
                invoker.createForm(props.formName);
                const routerConfig = invoker.getReceiver();
                
                // Log.log({
                //     receiver:     receiver,
                //     invoker:      invoker,
                //     routerConfig: routerConfig,
                // });
                
                resolve(routerConfig.config, routerConfig.options);
            }
        },
    };
    
    
    resolveRoute(config) {
        this._config = config;
        return this;
    }
    
}
