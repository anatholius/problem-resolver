import PropsAbstract from "./PropsAbstract";

import ControlWrapperDecorator from "../decorators/ControlWrapperDecorator";
import LeafInnerDecorator from "../decorators/LeafInnerDecorator";
import LeafWrapperDecorator from "../decorators/LeafWrapperDecorator";
import ErrorDecorator from "../decorators/ErrorDecorator";
import * as Helper from "../../../../Helper/Helper";

/**
 * @param {string} name - nazwa dekoratora
 * @param {Object} [options] - dodatkowe opcje dekoratora
 * @return {*}
 */
const decorators = (name, options) => {
    const objects = {
        controlWrapper: new ControlWrapperDecorator(),
        leafInner:      new LeafInnerDecorator(),
        leafWrapper:    new LeafWrapperDecorator(),
        error:          new ErrorDecorator(options),
    };
    return objects[name];
};

/**
 * @abstract
 */
export default class FieldAbstract {
    _fieldConfig;
    _formConfig;
    _decorators = [];
    /** @type {PropsAbstract} */
    _props = PropsAbstract;
    /** @abstract */
    _output = '';
    
    constructor(fieldConfig, formConfig) {
        this._fieldConfig = fieldConfig;
        this._formConfig = formConfig;
        
    }
    
    addDecorator(name, options) {
        this._decorators.push(decorators(name, options));
    }
    
    removeDecorator(name) {
        for (let key in this._decorators) {
            if (this._decorators.hasOwnProperty(key) && this._decorators[key].displayName === `${Helper.ucfirst(name)}Decorator`) {
                delete this._decorators[key];
                break;
            }
        }
    }
    
    /**
     * @interface
     */
    getOutput = () => {
        if (this._decorators.length > 0) {
            // console.log('this._decorators.length', this._decorators.length);
            for (let decorator of this._decorators) {
                // console.info('decorating by ', decorator.displayName);
                decorator.decorate(this);
            }
        }
        
        return this._output;
    };
    
}