import React from "react";

/**
 * @implements DecoratorInterface
 */
export default class LeafInnerDecorator {
    displayName = 'LeafInnerDecorator';
    
    decorate = (component) => {
        const Component = component._output;
        component._output = (
            <div className="item-inner">
                <div className="item-title item-floating-label">{component._props.label}</div>
                <Component/>
            </div>
        );
        console.log(`now component is decorated by '${this.displayName}'`);
    };
}