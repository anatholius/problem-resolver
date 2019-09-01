import React from 'react';
import {
    App,
    Block,
    BlockFooter,
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
    Statusbar,
    View,
} from 'framework7-react';

import routes from './../routes';

// export default function (props) {
export default class ProblemResolveApp extends React.Component {
    displayName = 'ProblemResolveApp';
    project_assets_dir = '';
    
    render() {
        const f7params = {
            id:            'pro.anatholius.problems',
            name:          'Problem Resolver',
            theme:         'auto',
            serviceWorker: {
                path:  this.project_assets_dir + 'sw.js',
                scope: './',
            },
            on:            {
                serviceWorkerRegisterSuccess:   (registration) => {
                    console.group('registration worker succeed');
                    console.log(registration);
                    console.groupEnd();
                },
                serviceWorkerRegisterError:     (error) => {
                    console.group('registration worker succeed');
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
        return (
            <App params={f7params}>
                {/* Statusbar */}
                <Statusbar/>
                
                {/* Left Panel */}
                <Panel left cover themeDark>
                    <View url="/panel-left/"/>
                </Panel>
                
                {/* Right Panel */}
                <Panel right reveal themeDark>
                    <View url="/panel-right/"/>
                </Panel>
                
                {/* Main View */}
                <View id="main-view" url="/" main className="safe-areas"/>
                
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
