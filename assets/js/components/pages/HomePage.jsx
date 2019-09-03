import React, {Component} from 'react';
import {
    Block,
    BlockTitle,
    Button,
    Col,
    Link,
    List,
    ListItem,
    Navbar,
    NavLeft,
    NavRight,
    NavTitle,
    Page,
    Row,
    Toolbar,
} from 'framework7-react';


export default class HomePage extends Component {
    displayName = 'HomePage';
    
    constructor(props, context) {
        super(props, context);
        console.log('props', props);
        console.log('context', context);
    }
    
    render() {
        return <Page>
            <Navbar>
                <NavLeft>
                    <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left"></Link>
                </NavLeft>
                <NavTitle>My App</NavTitle>
                <NavRight>
                    <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="right"></Link>
                </NavRight>
            </Navbar>
            {this.props.showInstallButton && <Button fill onClick={this.props.installApp}>Install this App</Button>}
            <Toolbar bottom>
                <Link>Left Link</Link>
                <Link>Right Link</Link>
            </Toolbar>
            <Block strong>
                <p>Here is your blank Framework7 app. Let's see what we have here.</p>
            </Block>
            <BlockTitle>Navigation</BlockTitle>
            <List>
                <ListItem link="/about/" title="About"></ListItem>
                <ListItem link="/form/" title="Form"></ListItem>
            </List>
            <BlockTitle>Modals</BlockTitle>
            <Block strong>
                <Row>
                    <Col width="50">
                        <Button fill raised popupOpen="#popup">Popup</Button>
                    </Col>
                    <Col width="50">
                        <Button fill raised loginScreenOpen="#login-screen">Login Screen</Button>
                    </Col>
                </Row>
            </Block>
            <BlockTitle>Panels</BlockTitle>
            <Block strong>
                <Row>
                    <Col width="50">
                        <Button fill raised panelOpen="left">Left Panel</Button>
                    </Col>
                    <Col width="50">
                        <Button fill raised panelOpen="right">Right Panel</Button>
                    </Col>
                </Row>
            </Block>
            <List>
                <ListItem link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></ListItem>
                <ListItem link="/load-something-that-doesnt-exist/" title="Default Route (404)"></ListItem>
            </List>
        </Page>;
    }
}
