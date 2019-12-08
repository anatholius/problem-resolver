import React from "react";

import SwipeableCollectionWidgetPrototype from "../SwipeableCollectionWidgetPrototype";

/**
 * @class SwipeableCollectionListWidget
 * @memberOf WidgetPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 */
export default class SwipeableCollectionListWidget extends SwipeableCollectionWidgetPrototype {
    displayName = 'SwipeableCollectionListWidget';
    
    collectionWidget = (props) => {
        this.configureSettings(props);
        
        console.group(`trying to render CollectionList(${props.field})...`);
        console.log('props', props);
        console.log('this', this);
        console.log('this.settings.data.items', this.settings.data.items);
        console.log('this.settings', this.settings);
        console.groupEnd();
        
        return <div>dupa collection list widget dla '{props.field}' </div>;
    }
}