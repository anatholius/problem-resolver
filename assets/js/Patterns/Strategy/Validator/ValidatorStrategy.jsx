import {ValidatorContext} from "./StrategyClass";

export class ResultValidator {
    success = false;
    errors = new Map;
    message;
    
    addError = (field, message) => {
        if (!this.errors.has(field)) {
            this.errors.set(field, new Set);
        }
        this.errors.get(field).add(message);
    };
    
    addStrategyResult = (strategyResult) => {
        if (!strategyResult.success && strategyResult.errors.size > 0) {
            console.log(`strategyResult(${strategyResult.strategy}).errors`, strategyResult.errors);
            strategyResult.errors.forEach((messages, field) => {
                if (!this.errors.has(field)) {
                    this.errors.set(field, new Set);
                }
                for (let message of messages) {
                    this.errors.get(field).add(message);
                }
            });
        }
    };
    
    getAnswer = () => {
        let answer = {};
        if (this.errors.size === 0) {
            this.success = true;
            this.message = 'Walidacja zakończyła się sukcesem :)';
            answer = {
                success: this.success,
                message: this.message,
            };
            // Log.success(answer);
        } else {
            this.success = false;
            this.message = 'Walidacja zakończyła się porażką!';
            
            answer = {
                success: this.success,
                // errors:  Helper.mapToObject(this.errors),
                message: this.message,
            };
            // Log.error(answer);
        }
        return answer;
    }
}

export default class Validator {
    displayName = 'Validator';
    context = {};
    mode;
    
    /**
     * konstruktor walidatora
     *
     * @param {string} formName - nazwa forma do walidacji
     * @param {ValidationConfig} validationConfig - konfiguracja walidacji formularza
     * @param {Array} collectionData - dane kolekcji do walidacji w kontekście kolekcji
     * @param {Object} requestParams - parametry requestu
     */
    constructor(formName, validationConfig, collectionData, requestParams) {
        // this.config = validationConfig;
        // console.clear();
        if (requestParams) {
            this.mode = requestParams.crud;
        }
        
        console.log('[Validator]:', this);
        
        console.groupCollapsed(this.displayName);
        console.log(validationConfig);
        
        const validatorFieldContext = new ValidatorContext('fields', validationConfig);
        validatorFieldContext.strategy.formName = formName;
        this.context.field = validatorFieldContext;
        
        const validatorFormContext = new ValidatorContext('form', validationConfig);
        validatorFormContext.strategy.formName = formName;
        this.context.form = validatorFormContext;
        
        const validatorCollectionContext = new ValidatorContext('collection', validationConfig, collectionData, this.mode);
        validatorCollectionContext.strategy.formName = formName;
        this.context.collection = validatorCollectionContext;
        
        console.groupEnd();
    }
    
    /**
     * #Procedura walidacji
     *  ## Walidujemy kolejno:
     *      ### - fieldRules
     *      ### - formRules
     *      ### - collectionRules
     *      @example ###fieldRules
     *      for(let field in this.config.fieldRules){
     *          //Jakie tu mogą być warianty?
     *          //TODO: Należało by może tu uskutecznić użycie
     *          //      Validator strategy
     *      }
     *      @example ###formRoles
     *
     *      @example ###formRoles
     *
     *
     */
    validate = (formData) => {
        // Log.intention(this.displayName,
        //     `# Procedura walidacji`,
        //     `this:`, this,
        //     `Powinniśmy zwalidować wszystkie contexty wg kolejności dodanej w this.context`,
        //     this.context,
        //     `Dane do walidacji:`, formData,
        // );
        
        const validationResult = new ResultValidator();
        
        if (this.context.field && this.context.field.strategy) {
            /** @type ValidatorFieldsStrategy */
            const fieldStrategy = this.context.field.strategy;
            const fieldStrategyResult = fieldStrategy.validate(formData);
            validationResult.addStrategyResult(fieldStrategyResult);
        }
        
        if (this.context.form && this.context.form.strategy && this.context.form.strategy.config) {
            /** @type ValidatorFormStrategy */
            const formStrategy = this.context.form.strategy;
            const formStrategyResult = formStrategy.validate(formData);
            validationResult.addStrategyResult(formStrategyResult);
        }
        
        if (this.context.collection && this.context.collection.strategy && this.context.collection.strategy.config) {
            /** @type ValidatorCollectionStrategy */
            const collectionStrategy = this.context.collection.strategy;
            const collectionStrategyResult = collectionStrategy.validate(formData);
            validationResult.addStrategyResult(collectionStrategyResult);
        }
        
        
        return validationResult.getAnswer();
        
    };
}
