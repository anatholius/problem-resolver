import React from "react";
import {Icon, ListItem} from "framework7-react";

import SwipeableItemWidgetPrototype from "../SwipeableItemWidgetPrototype";

/**
 * @class SwipeableRadioItemWidget
 * @memberOf WidgetPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 */
export default class SwipeableRadioItemWidget extends SwipeableItemWidgetPrototype {
    displayName = 'SwipeableRadioItemWidget';
    state = {
        opened: false,
    };
    
    configure = (index, item, useConfig) => {
        // console.warn('Konfiguracja radio...');
        this._configureSettings(index, item, useConfig);
    };
    
    render = () => {
        return <ListItem key={this.settings.item.key} swipeout radio
                         name={this.settings.item.name}
                         value={this.settings.item.value}
                         defaultChecked={this.settings.item.defaultChecked}
                         header={this.settings.item.data.header}
                         title={this.settings.item.data.title}
                         after={this.settings.item.data.after}
                         subtitle={this.settings.item.data.subtitle}
                         text={this.settings.item.data.text}
                         onClick={(e) => {
                             if (this.state.opened) {
                                 e.preventDefault();
                             }
                         }}
                         footer={this.settings.item.data.footer}
                         onSwipeoutOpen={() => {
                             this.state.opened = true;
                         }}
                         onSwipeoutClosed={() => {
                             this.state.opened = false;
                         }}
                         onChange={e => {
                             if (!this.state.opened) {
                                 return this.settings.item.onChange(e)
                             } else {
                                 e.preventDefault();
                             }
                         }}
        >
            {this.settings.widget.sortable && <Icon slot="media" icon="fad fa-bars"></Icon>}
            {this._renderActions(this.settings.data, this.settings.key)}
        </ListItem>;
    };
    
}