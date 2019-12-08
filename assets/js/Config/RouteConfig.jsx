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
 * @property {Array} tabs - Array with tab routes
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
export default class RouteConfig {
    /** Route name, e.g. home */
    name;
    /** Route path. Means this route will be loaded when we click link
     * that match to this path, or can be loaded by this path using API
     */
    path;
    /** Object with additional route options (optional) */
    options = {
        pushState: true,
    };
    /** Array of nested routes (optional) */
    // routes;
    /** View name where this route will be forced to load */
    viewName;

    // ### Master detail ###
    /** Enables this route as Master route */
    master;
    /** Array with detail routes */
    // detailRoutes;

    // ### Lazy modeules ###
    /**
     * Array with Lazy Modules to load before route loading
     */
    modules;

    // ### Content Related Properties ###
    /**
     * Load page content via Ajax.
     * Also supports dynamic route params from route path using {{paramName}} expression, e.g.
     * @example
     * {
     *     path: '/users/:userId/posts/:postId',
     *     url: 'http://myapp.com/posts/{{userId}}/{{postId}}'
     * }
     */
    url;
    /** Load page from passed Framework7 Router Component */
    component;

    /**
     * Do required asynchronous manipulation and the return required route content and options
     * should return function(routeTo, routeFrom, resolve, reject)
     */
    async;

    constructor(name, path) {
        this.name = name;
        this.path = path;
    }

    getConfig() {
        return {...this};
    }

}
