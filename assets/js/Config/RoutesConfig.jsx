export default class RoutesConfig {
    /** @type Array */
    _routes = [];

    /**
     * @param {RouteConfig} route
     */
    addRoute = (route) => {
        this._routes.push(route);
    };

    getRoutes = () => {
        const routes = [];
        for (let route of this._routes) {
            routes.push(route.getConfig())
        }
        return routes;
    }
}