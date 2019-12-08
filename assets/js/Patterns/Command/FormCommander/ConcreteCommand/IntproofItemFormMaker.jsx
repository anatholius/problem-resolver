import FormMaker from "../FormMaker";

export default class IntproofItemFormMaker extends FormMaker {
    
    constructor(receiver) {
        super(receiver);
        this._renderedFields = [];
    }
    
}
