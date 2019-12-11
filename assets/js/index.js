import React from 'react';
import ReactDOM from 'react-dom';
import './scss/layout.scss';
import 'framework7/css/framework7.bundle.min.css';
// Import F7 Bundle
import Framework7 from 'framework7/framework7.esm.bundle';
// Import F7-React Plugin
import Framework7React from 'framework7-react';
import Shell from './Shell';

// Import KPIR Plugins
import HelperPlugin from "./Plugin/HelperPlugin";
import LoggerPlugin from "./Plugin/LoggerPlugin";
import ApiPlugin from "./Plugin/ApiPlugin";
import PWAPlugin from "./Plugin/PWAPlugin";
import DisplayablePlugin from "./Plugin/DisplayablePlugin";
import WidgetPlugin from "./Plugin/WidgetPlugin";

// Init F7-React Plugin
Framework7.use(Framework7React);

// Init KPiR Plugins
Framework7.use(HelperPlugin);
Framework7.use(LoggerPlugin);
Framework7.use(ApiPlugin);
Framework7.use(PWAPlugin);
Framework7.use(DisplayablePlugin);
Framework7.use(WidgetPlugin);

ReactDOM.render(<Shell f7={Framework7}/>, document.getElementById('root'));
