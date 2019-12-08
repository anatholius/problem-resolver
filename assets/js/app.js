// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

//import lauot stuuf like font-awesome
import './../scss/layout.scss';

// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle';

// Import Framework7-React plugin
import Framework7React from 'framework7-react';

// Import main App component
import App from './components/App.jsx';
// Framework7 styles
import 'framework7/css/framework7.bundle.css';

// Import KPIR Plugins
import HelperPlugin from "./Plugin/HelperPlugin";
import LoggerPlugin from "./Plugin/LoggerPlugin";
import ApiPlugin from "./Plugin/ApiPlugin";
import PWAPlugin from "./Plugin/PWAPlugin";
import DisplayablePlugin from "./Plugin/DisplayablePlugin";
import WidgetPlugin from "./Plugin/WidgetPlugin";


// Init Framework7-React plugin
Framework7.use(Framework7React);

// Init KPiR Plugins
Framework7.use(HelperPlugin);
Framework7.use(LoggerPlugin);
Framework7.use(ApiPlugin);
Framework7.use(PWAPlugin);
Framework7.use(DisplayablePlugin);
Framework7.use(WidgetPlugin);

// Mount React App
ReactDOM.render(
    React.createElement(App),
    document.getElementById('app'),
);
