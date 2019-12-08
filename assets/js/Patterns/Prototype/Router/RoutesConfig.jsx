import MainRoute from "./Routes/MainRoute";

export default class RoutesConfig {
    /** @type Array */
    _routes = [
        new MainRoute('kpir', '/'),
    ];
    
    constructor(api) {
        this._api = api;
    }
    
    /**
     * @param {RouteConfig} route
     */
    addRoute = (route) => {
        this._routes.push(route);
    };
    
    getRoutes = () => {
        return this._routes;
    }
}