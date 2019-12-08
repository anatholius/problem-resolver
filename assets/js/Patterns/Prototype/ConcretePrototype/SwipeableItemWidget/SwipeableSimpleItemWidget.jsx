import React from "react";
import {Icon, ListItem, SwipeoutActions, SwipeoutButton} from "framework7-react";

import SwipeableItemWidgetPrototype from "../SwipeableItemWidgetPrototype";

/**
 * @class SwipeableSimpleItemWidget
 * @memberOf WidgetPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 */
export default class SwipeableSimpleItemWidget extends SwipeableItemWidgetPrototype {
    displayName = 'SwipeableSimpleItemWidget';
    
    configure = (index, item) => {
        this._configureSettings(index, item);
    };
    
    render = () => {
        return <ListItem key={this.settings.field.key} swipeout radio
                         name={this.settings.field.name}
                         value={this.settings.field.value}
                         defaultChecked={this.settings.field.defaultChecked}
                         header={this.settings.field.header}
                         title={this.settings.field.title}
                         after={this.settings.field.after}
                         subtitle={this.settings.field.subtitle}
                         text={this.settings.field.text}
                         footer={this.settings.field.footer}
                         onChange={this.settings.field.onChange}
        >
            {this.settings.widget.sortable && <Icon slot="media" icon="fad fa-bars"/>}
            {this._renderButtons()}
        </ListItem>;
    };
    
}