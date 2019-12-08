import React from "react";

import SwipeableCollectionWidgetPrototype from "../SwipeableCollectionWidgetPrototype";
import {AccordionContent, Icon, List, ListItem} from "framework7-react";

/**
 * @class SwipeableCollectionAccordionWidget
 * @memberOf WidgetPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 */
export default class SwipeableCollectionAccordionWidget extends SwipeableCollectionWidgetPrototype {
    displayName = 'SwipeableCollectionAccordionWidget';
    
    collectionWidget = (props) => {
        // console.warn('collectionWidget this.settings', this.settings);
        // props.current = this.settings.data.current;
        this.configureSettings(props);
        
        // console.groupCollapsed(`trying to render CollectionAccordion(${props.field})...`);
        // console.log('props', props);
        // console.log('this', this);
        // console.log('this.settings.data.items', this.settings.data.items);
        // console.log('this.settings', this.settings);
        // console.groupEnd();
        
        const accordionContent = <AccordionContent>
            <List mediaList={this.settings.widget.mediaList}>
                {this.settings.data.items.map((item, index) => {
                    // return <div key={index}>item dupa</div>
                    return this.renderItem(this.settings.item.type, item, index)
                })}
            </List>
        </AccordionContent>;
        
        const accordionItem = <ListItem accordionItem title={this.settings.data.current.field.title}
                                        badge={this.settings.data.items.length}>
            <Icon slot="media" icon="fad fa-briefcase"></Icon>
            {accordionContent}
        </ListItem>;
        
        if (props.item) {
            return accordionItem;
        } else {
            return (
                <List accordionList inset>
                    {accordionItem}
                </List>
            );
        }
    }
}