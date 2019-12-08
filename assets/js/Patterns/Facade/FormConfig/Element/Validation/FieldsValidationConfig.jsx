/**
 * #Konfiguracja walidacji w kontekście pola
 * ##Role
 * - required - czy jest niepuste <
 * - type consistency - czy zgadza się typ wartości
 * - value correctness - czy wartość jest poprawna
 *
 * @property {Object} fields - konfiguracja zasad walidacji pól
 */
export default class FieldsValidationConfig {
    fields = {};
    
    /**
     * Konfiguracja walidacji pola
     *
     * @param {Object} fields - konfiguracja zasad walidacji pól
     */
    constructor(fields) {
        this.fields = fields;
    }
}