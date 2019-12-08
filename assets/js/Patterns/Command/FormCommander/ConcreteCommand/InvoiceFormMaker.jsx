import FormMaker from "../FormMaker";

export default class InvoiceFormMaker extends FormMaker {
    
    _formCommands = {
        dupa:  () => {
        },
        cipa:  () => {
        },
        cycki: () => {
        },
    };
    
    constructor(receiver) {
        super(receiver);
        this._renderedFields = [
            'economicEvent',
            'datePrep',
            'contractor',
            'invoiceNumber',
            'paymentMethod',
            'bankAccount',
            'invoiceItems',
            'amount',
        ];
    }
    
}
