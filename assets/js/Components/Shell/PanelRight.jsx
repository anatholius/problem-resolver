import React from "react";
import {Icon, Link, List, ListGroup, ListItem, Navbar, Page, Panel, View} from "framework7-react";
import * as PropTypes from "prop-types";
import Helper from "../../Plugin/Helpers/Helper";
import CompanyConfig from "../../Patterns/Facade/FormConfig/CompanyConfig";

export default class PanelRight extends React.Component {
    displayName = this.__proto__.constructor.name;
    
    static propTypes = {
        state:  PropTypes.object,
        config: PropTypes.object,
        app:    PropTypes.object,
    };
    
    render() {
        // console.log('this.props', this.props);
        // eslint-disable-next-line no-unused-vars
        let companySelected = null;
        if (this.props.app.data.current && this.props.app.data.current.company) {
            companySelected = {
                field: 'companyName',
                value: this.props.app.data.current.company && this.app.props.data.current.company.id,
                index: Helper.getIndexOfElementArrayById(this.props.app.data.current.company.id, this.props.data.collection.company),
            };
        }
        
        
        const CompanyCollectionWidget = this.props.app.widget
            .SwipeableCollection('accordion')
            .withConfig(new CompanyConfig())
            .withEvents(this.props.app.event)
            .withHandlers(this.props.app.handle)
            .buildWidget()
        ;
        
        return (
            <React.Fragment>
                <Panel right cover themeLight>
                    <View>
                        <Page>
                            <Navbar title="Operations" subtitle="Useful actions or nothing">
                                {!this.props.app.online &&
                                <Link slot="nav-right" color={this.props.app.online ? 'black' : 'red'}>
                                    <Icon icon={`fad fa-wifi${this.props.app.online ? '' : '-slash'}`}/>
                                </Link>}
                            </Navbar>
                            <List>
                                <ListGroup>
                                    {this.props.app.displayable('buttonCompany') && (
                                        <CompanyCollectionWidget item field="company" data={{
                                            items:   this.props.app.api.resource.data.collection.company,
                                            current: this.props.app.api.resource.data.current,
                                        }}/>
                                    )}
                                    
                                    
                                    {this.props.app.displayable('buttonLogout') &&
                                    <React.Fraqgment>
                                        <ListItem divider title="Divider Here"/>
                                        <ListItem link="#" title="Wyloguj" onClick={this.props.app.event.logout}>
                                            <Icon slot="media" icon="fad fa-sign-out"/>
                                        </ListItem>
                                    </React.Fraqgment>
                                    }
                                </ListGroup>
                            </List>
                        </Page>
                    </View>
                </Panel>
            </React.Fragment>
        );
    }
}