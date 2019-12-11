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
    NavLeft, Icon,
    NavRight,
    NavTitle,
    Page, AccordionContent,
    Row,
    Toolbar,
} from 'framework7-react';
import ShellNavbar from "../Components/Shell/ShellNavbar";
import PanelLeft from "../Components/Shell/PanelLeft";
import PanelRight from "../Components/Shell/PanelRight";


export default class HomePage extends Component {
    displayName = this.__proto__.constructor.name;
    
    constructor(props, context) {
        super(props, context);
        this.app = this.$f7;
        console.log('HomePage.props', props);
        console.log('context', context);
    }
    
    render() {
        console.log('this.app', this.app);
        return <Page>
            <ShellNavbar data={this.context.data} state={this.state} app={this.app}/>
            
            {this.app.displayable('panelLeft') && (
                <PanelLeft app={this.app}/>
            )}
            
            {this.app.displayable('resourceData') && (
                <PanelRight state={this.state} config={this.context.config} app={this.app}/>
            )}
            
            {/*<Toolbar bottom>*/}
            {/*    <Link>Left Link</Link>*/}
            {/*    <Link>Right Link</Link>*/}
            {/*</Toolbar>*/}y
            
            
            <br/><br/>
            <hr/>
            <BlockTitle>Sandbox</BlockTitle>
            <hr/>
            <br/><br/>
            <BlockTitle>Navigation</BlockTitle>
            <List>
                <ListItem link="/about/" title="About"/>
                <ListItem link="/form/" title="Form"/>
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
                <ListItem link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"/>
                <ListItem link="/load-something-that-doesnt-exist/" title="Default Route (404)"/>
            </List>
        </Page>;
    }
}
