import React from 'react';
import RouteConfig from "./RouteConfig";
import {mapToObjectSimple} from "../Patterns/Helper/Helper";

export default class AppConfig {
    root = '#app';
    theme = 'auto';
    name = 'Problem Resolver';
    id = 'pl.anatholius.issues';
    data = {};
    routes = [];
    on = {
        init: (app) => {
            console.log('F7 init');
            // console.log('this', this);
        },
        
        serviceWorkerRegisterSuccess:   (registration) => {
            console.group('registration worker succeed');
            console.log('registration', registration);
            const cacheStrategy = 'precache-app-page';
            
            console.groupEnd();
        },
        serviceWorkerRegisterError:     (error) => {
            console.group('registration worker error');
            console.log(error);
            console.groupEnd();
        },
        serviceWorkerUnregisterSuccess: (registration) => {
            console.group('registration worker succeed');
            console.log(registration);
            console.groupEnd();
        },
        serviceWorkerUnregisterError:   (registration, error) => {
            console.group('registration worker succeed');
            console.log('registration', registration);
            console.log('error', error);
            console.groupEnd();
        },
        
    };
    serviceWorker = {
        path:  'pr-sw.js',
        scope: '/',
    };
    methods = {};
    
    /**
     * Tworzy i dodaje konfigurację routa z komponentem
     *
     * @param name - nazwa trasy
     * @param path - ścieżka trasy
     * @param ReactComponent - nazwa komponentu strony
     * @param options - opcje trasy
     */
    addRoute = (name, path, ReactComponent, options) => {
        const route = new RouteConfig(name, path);
        route.component = ReactComponent;
        route.options = Object.assign(route.options, {...options});
        this.routes.push(route);
    };
    
    /**
     * Tworzy i dodaje konfigurację trasy kart
     *
     * @param name - nazwa trasy
     * @param path - ścieżka trasy
     * @param {Array} tabsConfig - nazwa komponentu strony
     * @param options - opcje trasy
     */
    addTabsRoute = (name, path, tabsConfig, options) => {
        const tabs = [];
        for (let tab of tabsConfig) {
            const tabRoute = new RouteConfig(name, path);
            tabRoute.component = tab.component;
            tabs.push(tabRoute);
        }
        const route = new RouteConfig(name, path);
        route.tabs = tabs;
        route.options = Object.assign(route.options, {...options});
        this.routes.push(route);
    };
    
    /**
     * Tworzy i dodaje konfigurację trasy złożonej z podrzędnych subtras
     *
     * @param name - nazwa trasy
     * @param path - ścieżka trasy
     * @param {Array} tabsConfig - nazwa komponentu strony
     * @param options - opcje trasy
     */
    addDetailsRoute = (name, path, detailRoutes, options) => {
        const tabs = [];
        for (let tab of detailRoutes) {
            const tabRoute = new RouteConfig(name, path);
            tabRoute.component = tab.component;
            tabs.push(tabRoute);
        }
        const route = new RouteConfig(name, path);
        route.tabs = tabs;
        route.options = Object.assign(route.options, {...options});
        this.routes.push(route);
    };
    
    /**
     * Tworzy i dodaje konfigurację routa asynchronicznego
     *
     * @param name - nazwa trasy
     * @param path - ścieżka trasy
     * @param config - nazwa komponentu strony
     * @param options - opcje trasy
     */
    addAsyncRoute = (name, path, config, options) => {
        const route = new RouteConfig(name, path);
        // console.log('config', config);
        // console.log('options', options);
        
        options.props = {
            type: config.type,
        };
        route.options = Object.assign(route.options, {...options});
        
        route.async = (routeTo, routeFrom, resolve, reject) => {
            console.log('routeFrom', routeFrom);
            console.log('routeTo', routeTo);
            
            config.component.contextType = React.createContext(options.context);
            
            const configResolve = {
                config:  {},
                options: options,
            };
            
            if (!config.hasOwnProperty('type')) {
                configResolve.config.component = config.component;
            } else {
                configResolve.config[config.type] = {
                    component: config.component,
                };
            }
            
            configResolve.options.props = routeTo.params;
            
            resolve(configResolve.config, configResolve.options);
        };
        this.routes.push(route);
    };
    
    getConfig() {
        return {
            id:            this.id,
            root:          this.root,
            theme:         this.theme,
            name:          this.name,
            data:          this.data,
            routes:        this.routes,
            serviceWorker: this.serviceWorker,
            methods:       this.methods,
            on:            this.on,
        };
    }
    
    getRoutes() {
        const routes = [];
        console.log('this.routes', this.routes);
        for (let route of this.routes) {
            const simpleObjectRoute = {};
            for (let routeKey in route) {
                if (route.hasOwnProperty(routeKey) && route[routeKey]) {
                    simpleObjectRoute[routeKey] = route[routeKey];
                }
            }
            routes.push(simpleObjectRoute);
        }
        return routes;
    }
}
