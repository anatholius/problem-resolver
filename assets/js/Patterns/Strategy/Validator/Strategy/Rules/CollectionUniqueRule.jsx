/**
 * Zasada walidacji unikalności pola formularza w kontekście kolekcji rekordów
 */
import {ResultRule} from "../RulesClass";

/**
 * @class
 * @name CollectionUniqueRule
 * @description Klasa definiująca zasadę walidacji '*unique*' dla kontekstu '*collection*'
 * @tutorial collectionUniqueRule
 */
export default class CollectionUniqueRule {
    displayName = 'CollectionUniqueRule';

    /**
     * #Algorytm walidacji zasady 'unique' dla kolekcji
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
        
        if (contextData.collectionData) {
            for (let item of contextData.collectionData) {
                if (item[contextData.fieldName] === value) {
                    algorithmResult.setError(`Ta wartość nie może się powtarzać w kolekcji`);
                    break;
                }
            }
        }
        
        return algorithmResult.getAnswer();
    };
}