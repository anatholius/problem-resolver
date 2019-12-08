import React from "react";

/**
 * @implements DecoratorInterface
 */
export default class ErrorDecorator {
    displayName = 'ErrorDecorator';
    _options;
    
    constructor(options) {
        this._options = options;
    }
    
    decorate = (component) => {
        const Component = component._output;
        component._output = (
            <Component/>
        );
        console.log(`now component is decorated by '${this.displayName}'`);
    };
}