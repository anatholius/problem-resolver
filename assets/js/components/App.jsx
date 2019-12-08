import React from 'react';

import {
    App,
    Block,
    BlockFooter,
    Button,
    Icon,
    Link,
    List,
    ListButton,
    ListInput,
    LoginScreen,
    LoginScreenTitle,
    Navbar,
    NavRight,
    Page,
    Panel,
    Popup,
    Appbar,
    View,
} from 'framework7-react';

import routes from './../routes';
import AppConfig from "../Config/AppConfig";
import HomePage from "./pages/HomePage";
import PanelLeftPage from "./pages/PanelLeftPage";
import PanelRightPage from "./pages/PanelRightPage";
import FormPage from "./pages/FormPage";
import AboutPage from "./pages/AboutPage";
import DynamicRoutePage from "./pages/DynamicRoutePage";
import NotFoundPage from "./pages/NotFoundPage";

export default class ProblemResolveApp extends React.Component {
    displayName = 'ProblemResolveApp';
    // project_assets_dir = 'https://127.0.0.1:8083/build';
    project_assets_dir = '';
    /** @type AppConfig */
    _config;
    
    constructor(props) {
        super(props);
        
        const appConfig = new AppConfig();
        appConfig.addAsyncRoute('home', '/', {
            component: HomePage,
        }, {
            transition: 'f7-cover-v',
            context:    appConfig,
        });
        appConfig.addAsyncRoute('panelLeft', '/panel-left/', {
            component: PanelLeftPage,
        }, {
            transition: 'f7-cover-v',
            context:    appConfig,
        });
        appConfig.addAsyncRoute('panelRight', '/panel-right/', {
            component: PanelRightPage,
        }, {
            transition: 'f7-cover-v',
            context:    appConfig,
        });
        appConfig.addAsyncRoute('simpleForm', '/form/', {
            component: FormPage,
        }, {
            transition: 'f7-cover-v',
            context:    appConfig,
        });
        appConfig.addAsyncRoute('form', '/form/:formName/', {
            component: FormPage,
        }, {
            transition: 'f7-cover-v',
            context:    appConfig,
        });
        appConfig.addAsyncRoute('about', '/about/', {
            component: AboutPage,
        }, {
            transition: 'f7-cover-v',
            context:    appConfig,
        });
        appConfig.addAsyncRoute('dynamicPage', '/dynamic-route/blog/:blogId/post/:postId/', {
            component: DynamicRoutePage,
        }, {
            transition: 'f7-cover-v',
            // context:    appConfig,
        });
        appConfig.addAsyncRoute('notFounPage', '(.*)', {
            component: NotFoundPage,
        }, {
            transition: 'f7-cover-v',
            // context:    appConfig,
        });
        this._config = appConfig;
        
        this.state = {};
    }
    
    componentDidMount = async () => {
        this.app = this.$f7;
        this.app.logger.info({_config: this._config});
        
        if (self.navigator.onLine) {
            this.setState({
                online: true,
            });
        } else {
            this.setState({
                online: false,
            });
        }
        
        self.addEventListener('beforeinstallprompt', (e) => {
            // Stash the event so it can be triggered later.
            this.deferredPrompt = e;
            
            this.setState({
                showInstallButton: true,
            });
        });
        
        self.addEventListener("online", () => {
            this.setState({
                online: true,
            });
        });
        self.addEventListener("offline", () => {
            this.setState({
                online: false,
            });
        });
    };
    
    installApp = (e) => {
        this.setState({
            showInstallButton: false,
        });
        // Show the prompt
        this.deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        this.deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                this.deferredPrompt = null;
            });
    };
    
    render() {
        const f7params = {
            id:            'pro.anatholius.issues',
            name:          'Problem Resolver',
            theme:         'auto',
            serviceWorker: {
                path:  this.project_assets_dir + '/sw.js',
                scope: '/',
            },
            on:            {
                init:                           () => {
                    console.log('App init', this.$f7);
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
            },
            // App routes
            routes,
        };
        
        console.log('_config', this._config.getRoutes());
        
        // <App params={f7params}>
        return (
            <App params={this._config} routes={this._config.getRoutes()}>
                {/* Statusbar */}
                <Appbar>
                    You are {this.state.online ? 'ONLINE' : 'OFFLINE'}.
                    {this.state.online && this.state.showInstallButton &&
                    <Button onClick={this.installApp}>Install this App</Button>}
                </Appbar>
                
                {/* Left Panel */}
                <Panel left cover themeDark>
                    <View url="/panel-left/"/>
                </Panel>
                
                {/* Right Panel */}
                <Panel right reveal themeDark>
                    <View url="/panel-right/"/>
                    <Icon icon={`fad fa-signal-alt${this.state.online ? '' : '-1'}`}/>
                </Panel>
                {/* Main View */}
                <View id="main-view" url="/" main className="safe-areas"
                      online={this.state.online}
                      pushState
                      installApp={this.installApp}
                      showInstallButton={this.state.showInstallButton}
                />
                
                {/* Popup */}
                <Popup id="popup">
                    <View>
                        <Page>
                            <Navbar title="Popup">
                                <NavRight>
                                    <Link popupClose>Close</Link>
                                </NavRight>
                            </Navbar>
                            <Block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto.
                                Cupiditate
                                laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione
                                aliquam.
                                Omnis iusto nemo quos ullam obcaecati, quod.</Block>
                        </Page>
                    </View>
                </Popup>
                
                {/* Login Screen */}
                <LoginScreen id="login-screen">
                    <View>
                        <Page loginScreen>
                            <LoginScreenTitle>Login</LoginScreenTitle>
                            <List form>
                                <ListInput
                                    label="Username"
                                    name="username"
                                    placeholder="Username"
                                    type="text"
                                />
                                <ListInput
                                    label="Password"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                />
                            </List>
                            <List>
                                <ListButton title="Sign In" loginScreenClose></ListButton>
                                <BlockFooter>
                                    <p>Click Sign In to close Login Screen</p>
                                </BlockFooter>
                            </List>
                        </Page>
                    </View>
                </LoginScreen>
            </App>
        );
    }
};
