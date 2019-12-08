import FormMaker from "../FormMaker";

export default class CompanyFormMaker extends FormMaker {
    
    constructor(receiver) {
        super(receiver);
        this._renderedFields = [
            'companyName',
            'partnership',
            'street',
            'house',
            'appartment',
            'postalCode',
            'city',
            'nip',
            'regon',
            'foundingDate',
            'bankAccounts',
        ];
    }
    
    
}
