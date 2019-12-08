export default class FormDirector {
    /** @type FormBuilder */
    _builder;
    
    constructor(builder) {
        this._builder = builder;
    }
    
    createForm = () => {
        return this._builder.buildForm();
    };
    
}