/**
 * @interface
 * @method buildField
 * @method getField
 */
export default class FieldBuilderAbstract {
    _fieldConfig;
    _formConfig;
    
    constructor(fieldConfig, formConfig) {
        this._fieldConfig = fieldConfig;
        this._formConfig = formConfig;
    }
    
    /**
     * @abstract
     */
    buildField = () => {
        console.log('siakiś zonk?');
    };
    
    /**
     * @abstract
     */
    getField = () => {
        
    };
    
    /**
     * @abstract
     */
    getComponent = () => {
        
    }
}