import React from "react";
import {BlockTitle, Icon, List, ListItem, Page, Panel, View} from "framework7-react";

export default class PanelLeft extends React.Component {
    displayName = this.__proto__.constructor.name;
    
    render() {
        return (
            <React.Fragment>
                {this.props.app.displayable('panelLeft') && <Panel left cover themeDark>
                    <View>
                        <Page>
                            <BlockTitle>Navigacja OFF-LINE</BlockTitle>
                            <List>
                                <ListItem link="#" title="Jakiś link1">
                                    <Icon slot="media" icon="fad fa-sign-out"/>
                                </ListItem>
                                <ListItem link="#" title="Jakiś link2">
                                    <Icon slot="media" icon="fad fa-sign-out"/>
                                </ListItem>
                                <ListItem link="#" title="Jakiś lin2k">
                                    <Icon slot="media" icon="fad fa-sign-out"/>
                                </ListItem>
                                
                                <ListItem divider title="Divider Here"/>
                                
                                <ListItem link="#" title="Jakiś link">
                                    <Icon slot="media" icon="fad fa-sign-out"/>
                                </ListItem>
                            </List>
                        </Page>
                    </View>
                </Panel>}
            </React.Fragment>
        );
    }
}