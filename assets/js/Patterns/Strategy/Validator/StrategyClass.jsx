import ValidationRules from "./Strategy/RulesClass";
import FormDependsRule from "./Strategy/Rules/FormDependsRule";
import CollectionRequiredRule from "./Strategy/Rules/CollectionRequiredRule";
import CollectionUniqueRule from "./Strategy/Rules/CollectionUniqueRule";
import CollectionRequiredValueRule from "./Strategy/Rules/CollectionRequiredValueRule";
import ValidatorConfigException from "../../../Patterns/Singleton/Exception/ConcreteException/ValidatorConfigException";
import ValidatorStrategyException from "../../../Patterns/Singleton/Exception/ConcreteException/ValidatorStrategyException";


/**
 * @class
 * @name ResultStrategy
 * @description ###Klasa reprezentująca interfejs rezultatu walidacji strategii
 *
 * @property {string} strategy - nazwa strategii
 * @property {boolean} success - wartość logiczna rezultatu
 * @property {Map} errors - mapa błędów walidacji
 */
class ResultStrategy {
    strategy;
    success = false;
    errors = new Map();
    
    constructor(strategyName) {
        this.strategy = strategyName;
    }
    
    addError = (field, message) => {
        if (!this.errors.has(field)) {
            this.errors.set(field, new Set());
        }
        this.errors.get(field).add(message);
    };
    
    getAnswer = () => {
        if (this.errors.size === 0) {
            // Log.success(`Strategy '${this.strategy}' validation successfully`);
            return {
                success: true,
            };
        } else {
            // Log.error(this.errors);
            return {
                success: false,
                errors:  this.errors,
            };
        }
    }
}

/**
 * @class
 * @name ValidatorContext
 * @description Klasa kontekstu strategii walidatora
 */
export class ValidatorContext {
    strategy;
    
    /**
     * @name ValidatorContext
     * #Konstruktor kontekstu strategii walidatora
     *
     * @param type - nazwa kontekstu
     * @param formConfig - konfiguracja formularza
     * @param collectionData - dane kolekcji
     * @param requestMode - typ CRUD
     */
    constructor(type, formConfig, collectionData, requestMode) {
        switch (type) {
            case "fields":
                this.strategy = new ValidatorFieldsStrategy(formConfig);
                break;
            case "form":
                this.strategy = new ValidatorFormStrategy(formConfig);
                break;
            case "collection":
                this.strategy = new ValidatorCollectionStrategy(formConfig, collectionData, requestMode);
                break;
            default:
                this.strategy = new ValidatorFieldsStrategy(formConfig)
        }
        // Log.info({'this.strategy': this.strategy});
        if (formConfig) {
            if (!this.strategy.config) {
                /** jeśli obiekt strategi zostanie wywołany bez parametrów */
                if (collectionData !== undefined) {
                    this._configureValidatorContextInterface(formConfig, collectionData);
                } else {
                    this._configureValidatorContextInterface(formConfig);
                }
            }
        } else {
//             Log.info(`Before use validatorContext you have to configure his strategy
// In next step use:
// \`.configureValidatorContextInterface({configData})\`
// `);
        }
    }
    
    /**
     * Konfiguracja interfejsu kontekstu strategii
     *
     * @private
     * @param {Object} configForm - konfiguracja formularza
     * @param {array} [collectionData] - dane kolekcji dla formularza
     * @return {ValidatorFieldsStrategy|ValidatorFormStrategy|ValidatorCollectionStrategy}
     */
    _configureValidatorContextInterface = (configForm, collectionData) => {
        if (collectionData !== undefined) {
            this.strategy.configureStrategy(configForm, collectionData);
        } else {
            this.strategy.configureStrategy(configForm);
        }
        return this.strategy;
    }
}

/**
 * @class
 * @method {function} validate
 */
class ValidatorStrategy extends ValidationRules {
    formName;
    config = {};
    result = {
        success:  false,
        messages: [
            {type: 'info', text: 'Info message'},
            {type: 'success', text: 'Success message'},
            {type: 'warning', text: 'Warning message'},
            {type: 'danger', text: 'Error message'},
        ],
        data:     {},
    };
    
    /**
     * Procedura validacji danej strategii
     * @param formData
     */
    validate(formData) {
//         Log.warning(this.displayName, `Jeśli co trzeba by walidować wewnętrznie w walidatorze to tu.
// Mamy formData`, {formData: formData});
    }
}

/**
 * @class
 */
class ValidatorFieldsStrategy extends ValidatorStrategy {
    displayName = 'ValidatorFieldsStrategy';
    
    /**
     * Powinniśmy ustawić konfigurację validatora w strategii fields
     * @param {ValidationConfig} [formConfig]
     */
    constructor(formConfig) {
        super();
        if (formConfig) {
            console.log('ValidatorFieldsStrategy created formConfig', formConfig);
            this.config = formConfig.fieldsRules
        }
    }
    
    /**
     *  Konfiguruje ustawienia walidacji strategii
     * @param configForm - konfiguracja walidacji forma
     */
    configureStrategy = (configForm) => {
        this.config = configForm.fieldsRules;
    };
    
    /**
     * @see ValidatorStrategy.validate
     */
    validate(formData) {
        super.validate(formData);
        console.groupCollapsed('ValidatorFieldsStrategy algorithm');
        
        
        // Log.intention([this.displayName,
        //     `Mamy dane do walidacji`, formData,
        //     `Powinniśmy zorbić loopa po wszystkich polach i sprawdzić czy dane zgadzają się odnośnie reguł zawartych w configu:`, this.config,
        // ]);
        
        // this.result = new Map;
        this.result = new ResultStrategy('fields');
        
        for (let field in formData) {
            if (formData.hasOwnProperty(field)) {
                const fieldValue = formData[field];
                if (this.config.fields[field] === undefined) {
                    throw new ValidatorConfigException(`
Brakuje konfiguracji validacji dla pola '${field}' w formularzu '${this.formName}'`);
                }
                if (this.config.fields[field] === false) {
                    continue;
                }
                console.groupCollapsed(`[${this.displayName}].validate(${field})`);
                const validationConfig = this.config.fields[field];
                console.log(`validationConfig(${field}):`, validationConfig);
                
                const typeValidated = this.validateRule('field', 'type', fieldValue, validationConfig.type);
                if (!typeValidated) {
                    this.result.addError(field, `Niezgodny typ! Otrzymano '${typeof fieldValue}', a powinien być '${validationConfig.type}'`);
                    
                }
                if (validationConfig.required !== undefined) {
                    const requiredValidated = this.validateRule('field', 'required', fieldValue, validationConfig.required);
                    
                    console.log('this.result', this.result);
                    
                    if (!requiredValidated) {
                        this.result.addError(field, `To pole jest wymagane!`);
                    }
                }
                if (validationConfig.correctness !== undefined) {
                    const correctnessValidated = this.validateRule('field', 'correctness', fieldValue, validationConfig.correctness);
                    
                    if (!correctnessValidated) {
                        this.result.addError(field, `Wartość tego pola jest nieprawidłowa`);
                    }
                }
                console.groupEnd();
            }
        }
        console.groupEnd();
        
        return this.result.getAnswer();
    }
    
}

/**
 * @class
 */
class ValidatorFormStrategy extends ValidatorStrategy {
    displayName = 'ValidatorFormStrategy';
    
    /**
     * Powinniśmy ustawić konfigurację validatora w strategii form
     * @param {ValidationConfig} [formConfig]
     */
    constructor(formConfig) {
        super();
        if (formConfig) {
            console.log('ValidatorFormStrategy created formConfig', formConfig);
            this.config = formConfig.formRules
        }
    }
    
    /**
     *  Konfiguruje ustawienia walidacji strategii
     * @param configForm - konfiguracja walidacji forma
     */
    configureStrategy = (configForm) => {
        // console.log('configForm', configForm);
        this.config = configForm.formRules;
    };
    
    validate(formData) {
        super.validate(formData);
        console.groupCollapsed('ValidatorFormStrategy algorithm');
        
        // Log.intention([this.displayName,
        //     `Tu będziemy walidować wg zasad formularza`,
        //     `Jak takie zasad łatwo skomponować w configu?`,
        //     `Mamy dane do walidacji`, formData,
        //     `Ok, tutaj loopujemy po configu:`, this,
        // ]);
        
        this.result = new ResultStrategy('form');
        
        for (let rule of this.rules) {
            //Jeśli istnieją jakiekolwiek konfiguracje dla pola
            //TODO: fix helper
            // const ruleMap = Helper.objectToMap(rule);
            const ruleMap = new Map();
            console.log('ruleMap', ruleMap);
            for (let [field, ruleConfig] of ruleMap) {
                if (ruleConfig !== false) {
                    console.group(`[${this.displayName}].validate(${field})`);
                    let ruleName = '';
                    if (ruleConfig instanceof FormDependsRule) {
                        ruleName = 'depends';
                    }
                    if (ruleName) {
                        const fieldValidated = this.validateRule('form', ruleName, formData[field], ruleConfig, formData);
                        // console.log(`form.fieldValidated('${field}')`, fieldValidated);
                        if (!fieldValidated.success) {
                            this.result.addError(field, fieldValidated.message);
                        }
                    } else {
                        throw new ValidatorStrategyException(`
Wystąpiła nieznana zasada walidacji !!!
Sprawdź konfigurację formularza '${this.formName}'`);
                    }
                    console.groupEnd();
                }
            }
        }
        console.groupEnd();
        
        return this.result.getAnswer();
    }
}

/**
 * @class
 */
class ValidatorCollectionStrategy extends ValidatorStrategy {
    displayName = 'ValidatorCollectionStrategy';
    
    /**
     * Powinniśmy ustawić konfigurację validatora w strategii form
     * @param {ValidationConfig} [formConfig]
     * @param {array} [collectionData]
     * @param {array} [requestMode]
     */
    constructor(formConfig, collectionData, requestMode) {
        super();
        if (formConfig) {
            console.log('ValidatorCollectionStrategy created formConfig', formConfig);
            this.config = formConfig.collectionRules
        }
        if (collectionData) {
            this.collectionData = collectionData;
        }
        if (requestMode) {
            this.mode = requestMode;
        }
    }
    
    /**
     *  Konfiguruje ustawienia walidacji strategii
     * @param configForm - konfiguracja walidacji formularza
     * @param collectionData - dane kolekcji dla formularza
     */
    configureStrategy = (configForm, collectionData) => {
        this.config = configForm.collectionRules;
        this.collectionData = collectionData;
    };
    
    validate(formData) {
        super.validate(formData);
        console.group('ValidatorCollectionStrategy algorithm');
        
        // Log.intention([this.displayName,
        //     `Mamy dane do walidacji`, formData,
        //     `Mamy config następujący`, this.config,
        //     `Powinniśmy mieć dane kolekcji`, this.collectionData,
        // ]);
        this.result = new ResultStrategy('collection');
        
        console.log('this.config.rules', this.config.rules);
        
        for (let rule of this.config.rules) {
            console.log('rule', rule);
            //TODO: fix helper
            // const ruleMap = Helper.objectToMap(rule);
            const ruleMap = new Map();
            console.log('ruleMap', ruleMap);
            for (let [field, ruleConfig] of ruleMap) {
                console.log('field', field);
                console.log('ruleConfig', ruleConfig);
                if (ruleConfig !== false) {
                    console.group(`[${this.displayName}].validate(${field})`);
                    let ruleName = '';
                    if (ruleConfig instanceof CollectionRequiredRule) {
                        ruleName = 'required';
                    } else if (ruleConfig instanceof CollectionUniqueRule) {
                        if (this.mode === 'edit') {
                            return this.result.getAnswer();
                        }
                        ruleName = 'unique';
                    } else if (ruleConfig instanceof CollectionRequiredValueRule) {
                        ruleName = 'requiredValue';
                    }
                    if (ruleName) {
                        const fieldValidated = this.validateRule('collection', ruleName, formData[field], ruleConfig, {
                            fieldName:      field,
                            collectionData: this.collectionData,
                        });
                        console.log(`collection.fieldValidated('${field}')`, fieldValidated);
                        if (!fieldValidated.success) {
                            this.result.addError(field, fieldValidated.message);
                        }
                    } else {
                        throw new ValidatorStrategyException(`
Wystąpiła nieznana zasada walidacji !!!
Sprawdź konfigurację walidatora i formularza '${this.formName}'`);
                    }
                    console.groupEnd();
                }
            }
        }
        console.groupEnd();
        
        return this.result.getAnswer();
    }
}

/*
const validationStrategy = (context) => {
    console.log('ValidationStrategy', this);
    const validatorContext = new ValidatorContext(context);
    console.log('this.context', validatorContext);
    return validatorContext.ValidatorContextInterface();
};
export default validationStrategy;

function init_ValidatorStrategy() {
    let contextA = new ValidatorContext("A");
    contextA.ValidatorContextInterface();
    let contextB = new ValidatorContext("B");
    contextB.ValidatorContextInterface();
}
//*/