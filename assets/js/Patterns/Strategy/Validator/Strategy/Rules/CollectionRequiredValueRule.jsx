/**
 * Zasada walidacji wymagalności pola formularza w kontekście kolekcji rekordów
 */
import {ResultRule, RuleException} from "../RulesClass";

/**
 * @class
 * @name CollectionUniqueRule
 * @description Klasa definiująca zasadę walidacji '*unique*' dla kontekstu '*collection*'
 * @tutorial collectionRequiredValueRule
 */
export default class CollectionRequiredValueRule {
    displayName = 'CollectionRequiredValueRule';
    howMany;
    requiredValue;
    
    /**
     * Określa rolę zależności w kontekście formularza
     *
     * @param {boolean|string} requiredValue - wartość wymagana dla pola
     * @param {number} howMany = 1 - ile razy ma wystąpić wartość (domyślnie: 1)
     */
    constructor(requiredValue, howMany = 1) {
        this.howMany = howMany;
        this.requiredValue = requiredValue;
    }
    
    /**
     * #Algorytm walidacji zasady 'required' dla kolekcji
     *
     * @param value - wartość do sprawdzenia
     * @param contextData - Obiekt zawierający nazwę pola oraz dane kolekcji
     * @return {ResultRule}
     */
    algorithm = (value, contextData) => {
        if (isNaN(Number(value))) {
            throw new RuleException(`Wartość 'value' musi być konwertowalny na liczbę`);
        } else {
            value = Number(value);
        }
        // Log.intention([this.displayName,
        //     `Mamy dane:`,
        //     `fieldName = "${contextData.fieldName}"`,
        //     `value="${value}"`,
        //     `typeof value="${typeof value}"`,
        //     `contextData`, contextData,
        // ]);
        
        const algorithmResult = new ResultRule('required');
        
        let count = 0;
        if (contextData.collectionData) {
            for (let item of contextData.collectionData) {
                if (item[contextData.fieldName] === this.requiredValue) {
                    count++;
                }
            }
        }
        let requiredValue = this.requiredValue;
        if (typeof this.requiredValue === 'boolean') {
            requiredValue = this.requiredValue ? 'true' : 'false';
        }
        
        if (count + (value === this.requiredValue ? 1 : 0) > this.howMany) {
            algorithmResult.setError('W kolekcji już istnieje rekord o tej wartości');
        } else if (count + (value === this.requiredValue ? 1 : 0) < this.howMany) {
            algorithmResult.setError(`W kolekcji musi istnieć element o wartości '${requiredValue}`);
        }
        
        return algorithmResult.getAnswer();
    };
}