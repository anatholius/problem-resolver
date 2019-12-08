import React from "react";

import SwipeableCollectionWidgetPrototype from "../SwipeableCollectionWidgetPrototype";
import {Button, Card, CardContent, CardHeader, Icon, List, NavTitle, Segmented} from "framework7-react";

/**
 * @class SwipeableCollectionCardWidget
 * @memberOf WidgetPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 */
export default class SwipeableCollectionCardWidget extends SwipeableCollectionWidgetPrototype {
    displayName = 'SwipeableCollectionCardWidget';
    
    
    collectionWidget = (props) => {
        this.configureSettings(props);
        const actions = this.settings.widget.actions;
        // console.warn(`Będziemy renderować collectionCardWidget( ${this.settings.name} )`, this.settings);

        const card = <Card className={this.settings.widget.wrapperClass.join(' ')}>
            <div className={this.settings.data.errorMessage && 'item-input-wrap'}>
                <CardHeader ref={e => this.buttonToPopoverWrapper = e}>
                    <NavTitle>{this.settings.widget.title}</NavTitle>
                    <Segmented>
                        {Object.keys(actions).map(key => {
                            const button = actions[key];
                            return <Button key={key} tabLinkActive
                                           color={button.color}
                                           href={button.action}
                                           data-parent-form={this.settings.widget.parentForm}>
                                <Icon icon={button.icon}>{button.label}</Icon>
                            </Button>
                        })}
                    </Segmented>
                </CardHeader>
                {this.settings.data.items && <CardContent>
                    <List mediaList={this.settings.widget.mediaList}>
                        {this.settings.data.items.map((item, index) => this.renderItem(this.settings.item.preview.type, item, index))}
                    </List>
                </CardContent>}
                {this.settings.data.errorMessage && <div
                    className="item-input-error-message">{Array.isArray(this.settings.data.errorMessage) ? this.settings.data.errorMessage.join(' • ') : this.settings.data.errorMessage}</div>}
            </div>
        </Card>;
        if (props.item) {
            return <li className="item-content">
                <div className="item-inner">
                    {card}
                </div>
            </li>;
        } else return card;
    }
}