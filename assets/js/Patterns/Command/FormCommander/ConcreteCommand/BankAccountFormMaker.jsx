import FormMaker from "../FormMaker";

export default class BankAccountFormMaker extends FormMaker {
    
    constructor(receiver) {
        super(receiver);
        this._renderedFields = [
            'bankAccountName',
            'bankName',
            'accountNumber',
            'isDefault',
        ];
    }
    
}
