import React from "react";

/**
 * @implements DecoratorInterface
 */
export default class ControlWrapperDecorator {
    displayName = 'ControlWrapperDecorator';
    
    decorate = (component) => {
        const Component = component._output;
        component._output = (
            <div className="item-input-wrap">
                <Component/>
            </div>
        );
        console.log(`now component is decorated by '${this.displayName}'`);
    };
}