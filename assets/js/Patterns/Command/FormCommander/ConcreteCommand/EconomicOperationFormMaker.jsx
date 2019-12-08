import FormMaker from "../FormMaker";

export default class EconomicOperationFormMaker extends FormMaker {
    
    constructor(receiver) {
        super(receiver);
        this._renderedFields = [
            'description',
        ];
    }
    
}
