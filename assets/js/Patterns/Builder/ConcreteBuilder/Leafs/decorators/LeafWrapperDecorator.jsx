import React from "react";

/**
 * @implements DecoratorInterface
 */
export default class LeafWrapperDecorator {
    displayName = 'LeafWrapperDecorator';
    
    decorate = (component) => {
        const Component = component._output;
        component._output = (
            <li className={component._props.wrapperClass.join(' ')}>
                <Component/>
            </li>
        );
        console.log(`now component is decorated by '${this.displayName}'`);
    };
}