/**
 * Zasada walidacji wymagalności pola formularza w kontekście kolekcji rekordów
 */
import {ResultRule} from "../RulesClass";

/**
 * @class
 * @name CollectionUniqueRule
 * @description Klasa definiująca zasadę walidacji '*unique*' dla kontekstu '*collection*'
 * @tutorial collectionRequiredRule
 */
export default class CollectionRequiredRule {
    displayName = 'CollectionRequiredRule';

    
    /**
     * #Algorytm walidacji zasady 'required' dla kolekcji
     *
     * @param value - wartość do sprawdzenia
     * @param contextData - Obiekt zawierający nazwę pola oraz dane kolekcji
     * @return {ResultRule}
     */
    algorithm = (value, contextData) => {
        // Log.intention([this.displayName,
        //     `Mamy dane:`,
        //     `fieldName = "${contextData.fieldName}"`,
        //     `value="${value}"`,
        //     `typeof value="${typeof value}"`,
        //     `contextData`, contextData,
        // ]);
        
        const algorithmResult = new ResultRule('required');
        
        if (!value || (Array.isArray(value) && value.length === 0) || !Array.isArray(value)) {
            algorithmResult.setError('W kolekcji musi istnieć przynajmniej jeden element');
        }
        
        // if (contextData.collectionData.length === 0) {
        //     algorithmResult.setError('W kolekcji wymagany jest przynajmniej jeden element');
        // }
        // for (let item of contextData.collectionData) {
        //     if (item[contextData.fieldName] === value) {
        //         algorithmResult.setError('W kolekcji wymagany jest przynajmniej jeden element');
        //         break;
        //     }
        // }
        
        return algorithmResult.getAnswer();
    };
}