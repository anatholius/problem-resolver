import FormMaker from "../FormMaker";

export default class EconomicEventFormMaker extends FormMaker {
    
    constructor(receiver) {
        super(receiver);
        this._renderedFields = [
            'description',
        ];
    }
    
}
