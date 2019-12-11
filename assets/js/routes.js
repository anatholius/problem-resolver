// import React from 'react';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import FormPage from './Pages/FormPage';
import DynamicRoutePage from './Pages/DynamicRoutePage';
import NotFoundPage from './Pages/NotFoundPage';
import PanelLeftPage from './Pages/PanelLeftPage';
import PanelRightPage from './Pages/PanelRightPage';

const secure = (component) => {
    return async (routeTo, routeFrom, resolve, reject) => {
        console.log('routeFrom', routeFrom);
        console.log('routeTo', routeTo);
        console.log('component', component);
        return await resolve({
            component: component,
        }, {
            props: {
                showInstallButton: false,
            },
        });
    }
};


const make = {
    async: (api) => {
        return (routeTo, routeFrom, resolve, reject) => {
            console.log('async');
            
            const options = {};
            
            const props = {
                api:      api,
                formName: routeTo.params.formName,
                id:       routeTo.params.id,
            };
            
            Log.intention(
                `routes.js:make.async()`,
                `We are in route composing component place.`,
                `We have route config: `, {
                    routeFrom: routeFrom,
                    routeTo:   routeTo,
                    props:     props,
                },
                `We will build the form and download the appropriate configuration to resolve the router`,
                `We need to specify context.`,
                `Kontekst to funkcja zależna od:`,
                `   - formConfig (konfiguracja formularza - zależna od 'nazwy formularza' i określona w stosownej klasie)`,
                `   - props:`,
                `       właściwości przestrzeni - TODO: Co jest przestrzenią w tym miejscu?`,
                `   - state`,
                `       moment w czasie - tu initial state - zależny od tego czy form jest new czy edit`,
                `   - originContext:`,
                `       kontekst z którego pochodzi tworzony kontekst, np. `,
                `       • jeśli pochodzi z innego formularza - tamten powinien być zupdatowany po udanym submicie`,
                `       • jeśli pochodzi z componentu - który powinien być zupdatowany po udanym submicie`,
            );
            
            // const originContext = {};
            // Ta sama struktura co poniżej - raczej należałoby zainicjować opcję zapisywania gdzieś kontekstów
            // Mamy takie miejsce obecnie w Api, nazywa się forms i formsQueue - TODO: należy to rozwiązanie
            
            
            const receiver = new RouteConfig(props);
            const invoker = new FormCreator(receiver);
            const routerConfig = invoker.createForm(props.formName);
            
            Log.log({
                receiver:     receiver,
                invoker:      invoker,
                routerConfig: routerConfig,
            });
            
            Log.effect(this.displayName,
                `After all operation about creating form, fields components we should have here`,
                `frouterConfig`, routerConfig,
            );
            
            resolve(routerConfig.config, routerConfig.options);
        };
    },
};

export default [
    {
        path:    '/',
        async:   secure(HomePage),
        options: {
            pushState: true,
        },
    },
    {
        path:      '/panel-left/',
        component: PanelLeftPage,
        options:   {
            pushState: true,
        },
    },
    {
        path:      '/panel-right/',
        component: PanelRightPage,
        options:   {
            pushState: true,
        },
    },
    {
        path:    '/about/',
        async:   secure(AboutPage),
        options: {
            pushState: true,
        },
    },
    {
        path:      '/form/:formName',
        component: FormPage,
        options:   {
            pushState: true,
        },
    },
    {
        path:      '/dynamic-route/blog/:blogId/post/:postId/',
        component: DynamicRoutePage,
        options:   {
            pushState: true,
        },
    },
    {
        path:      '(.*)',
        component: NotFoundPage,
        options:   {
            pushState: true,
        },
    },
];
