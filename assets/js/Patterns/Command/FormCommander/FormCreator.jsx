import CompanyFormMaker from "./ConcreteCommand/CompanyFormMaker";
import BankAccountFormMaker from "./ConcreteCommand/BankAccountFormMaker";
import ContractorFormMaker from "./ConcreteCommand/ContractorFormMaker";
import EconomicEventFormMaker from "./ConcreteCommand/EconomicEventFormMaker";
import EconomicOperationFormMaker from "./ConcreteCommand/EconomicOperationFormMaker";
import InvoiceFormMaker from "./ConcreteCommand/InvoiceFormMaker";
import InvoiceItemFormMaker from "./ConcreteCommand/InvoiceItemFormMaker";
import IntproofFormMaker from "./ConcreteCommand/IntproofFormMaker";
import IntproofItemFormMaker from "./ConcreteCommand/IntproofItemFormMaker";


export default class FormCreator {
    _receiver;
    /** @type Map */
    _formCreators;

    constructor(receiver) {
        // super();
        // console.log(receiver);
        this._receiver = receiver;
        this._collectCreators();
    }

    _collectCreators = () => {
        this._formCreators = new Map();
        this._formCreators.set('company', new CompanyFormMaker(this._receiver));
        this._formCreators.set('bankAccount', new BankAccountFormMaker(this._receiver));
        this._formCreators.set('contractor', new ContractorFormMaker(this._receiver));
        this._formCreators.set('economicEvent', new EconomicEventFormMaker(this._receiver));
        this._formCreators.set('economicOperation', new EconomicOperationFormMaker(this._receiver));
        this._formCreators.set('invoice', new InvoiceFormMaker(this._receiver));
        this._formCreators.set('invoiceItem', new InvoiceItemFormMaker(this._receiver));
        this._formCreators.set('intproof', new IntproofFormMaker(this._receiver));
        this._formCreators.set('intproofItem', new IntproofItemFormMaker(this._receiver));
    };

    _getMaker = (formName) => {
        return this._formCreators.get(formName);
    };

    createForm = (formName) => {
        console.log('formName',formName);
        const command = this._getMaker(formName);
        command.makeForm(formName);
    };

    getReceiver = () => {
        return this._receiver;
    };

}
