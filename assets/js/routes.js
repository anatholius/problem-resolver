import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import FormPage from './components/pages/FormPage';
import DynamicRoutePage from './components/pages/DynamicRoutePage';
import NotFoundPage from './components/pages/NotFoundPage';
import PanelLeftPage from './components/pages/PanelLeftPage';
import PanelRightPage from './components/pages/PanelRightPage';

const secure = (component) => {
    return (routeTo, routeFrom, resolve, reject) => {
        console.log('routeFrom',routeFrom);
        console.log('routeTo',routeTo);
        return resolve({
            component: component,
        },{
            props: {
                showInstallButton: false
            }
        });
    }
};

export default [
    {
        path:  '/',
        async: secure(HomePage),
    },
    {
        path:      '/panel-left/',
        component: PanelLeftPage,
    },
    {
        path:      '/panel-right/',
        component: PanelRightPage,
    },
    {
        path:  '/about/',
        async: secure(AboutPage),
    },
    {
        path:      '/form/',
        component: FormPage,
    },
    {
        path:      '/dynamic-route/blog/:blogId/post/:postId/',
        component: DynamicRoutePage,
    },
    {
        path:      '(.*)',
        component: NotFoundPage,
    },
];
