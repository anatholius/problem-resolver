import FormMaker from "../FormMaker";

export default class InvoiceItemFormMaker extends FormMaker {
    
    constructor(receiver) {
        super(receiver);
        this._renderedFields = [
            'economicEvent',
            'pos',
        ];
    }
    
}
