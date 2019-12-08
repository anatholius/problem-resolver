import OwnerConfig from "./FormConfig/OwnerConfig";
import CompanyConfig from "./FormConfig/CompanyConfig";
import BankAccountConfig from "./FormConfig/BankAccountConfig";
import ContractorConfig from "./FormConfig/ContractorConfig";
import InvoiceConfig from "./FormConfig/InvoiceConfig";
import InvoiceItemConfig from "./FormConfig/InvoiceItemConfig";
import EconomicEventConfig from "./FormConfig/EconomicEventConfig";
import EconomicOperationConfig from "./FormConfig/EconomicOperationConfig";
import IntproofConfig from "./FormConfig/IntproofConfig";
import IntproofItemConfig from "./FormConfig/IntproofItemConfig";

export default class ResourceConfig {
    _form = {
        owner: new OwnerConfig(),
        company: new CompanyConfig(),
        bankAccount: new BankAccountConfig(),
        contractor: new ContractorConfig(),
        economicEvent: new EconomicEventConfig(),
        economicOperation: new EconomicOperationConfig(),
        invoice: new InvoiceConfig(),
        invoiceItem: new InvoiceItemConfig(),
        intproof: new IntproofConfig(),
        intproofItem: new IntproofItemConfig(),
    };

    getFormConfig = (formName) => {
        return this._form[formName];
    };

    /**
     * Generuje IRI dla danej encji
     * (uwzględnia IRI dla ownera)
     *
     * @param entityName - nazwa encji
     * @param ownerId - id właściciela firmy
     * @returns {string}
     */
    getIRI = (entityName, ownerId) => {
        if (entityName === 'owner') {
            const entityConfig = this.getFormConfig(entityName);
            const ownerConfig = this.getFormConfig('owner');
            console.log('entityConfig', entityConfig);
            console.log('ownerConfig', ownerConfig);
            return `/api/${entityName !== 'owner' ? 'kpir/' : ''}${entityConfig.apiConfig.action}/${ownerId}`;
        } else {
            throw new Error(`No IRI generated for entity ${entityName}`);
        }
    };
}