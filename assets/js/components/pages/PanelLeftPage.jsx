import React from 'react';
import {Page, Navbar, Block, BlockTitle, List, ListItem, Button, Col} from 'framework7-react';

export default () => (
    <Page>
        <Navbar title="Left Panel"/>
        <Block strong>
            <p>Left panel content goes here</p>
        </Block>
        <BlockTitle>Load page in panel</BlockTitle>
        {/*<List>*/}
        {/*  <ListItem link="/about/" title="About"></ListItem>*/}
        {/*  <ListItem link="/form/" title="Form"></ListItem>*/}
        {/*</List>*/}
        <BlockTitle>Load page in main view</BlockTitle>
        <List>
            <ListItem link="/about/" title="About" view="#main-view" panelClose/>
            <ListItem link="/dynamic-route/blog/45/post/125/?foo=bar#about/" title="Dynamic Route" view="#main-view"
                      panelClose/>
            <ListItem link="/form/problem/" title="Start issue" view="#main-view" panelClose/>
            <ListItem link="/form/problem/" title="Popup issue" fill raised popupOpen="#popup"/>
        </List>
    </Page>
);
