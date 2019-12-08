import FormMaker from "../FormMaker";

export default class ContractorFormMaker extends FormMaker {
    
    constructor(receiver) {
        super(receiver);
        this._renderedFields = [
            'shortcut',
            'companyName',
            'partnership',
            'street',
            'house',
            'appartment',
            'postalCode',
            'city',
            'nip',
            'regon',
        ];
    }
    
}
