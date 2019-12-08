/**
 * #Konfiguracja walidacji w kontekście pola
 * ##Role
 * - required - czy jest niepuste <
 * - type consistency - czy zgadza się typ wartości
 * - value correctness - czy wartość jest poprawna
 * 
 * @property {string} type - typ pola
 * @property {boolean} required - czy pole jest wymagane?
 * @property {RegExp} correcness - wzór do sprawdzenia poprawności wartości pola
 *  
 * @example ##type={wartość}
 * Może przyjmować wartości:
 *  'number' - pole <input> typu "number"
 *  'text' - pole <input> typu "text"
 *  'select' - pole <select>
 *  'date' - pole <input> typu "date"
 *  'checkbox' - pole <input> typu "checkbox"
 *  'radio' - pole <input> typu "radio"
 *  'collection' - kolekcja typu array
 *  
 *  @description **Warunki walidacji dla pola:**
 *  <table border=1 cellspacing=5 width="100%">
 *      <tr>
 *          <th>type</th>
 *          <th>required</th>
 *          <th>type</th>
 *          <th>correctness</th>
 *      </tr>
 *      <tr>
 *          <td>***number***</td>
 *          <td>`value!==""`</td>
 *          <td>`typeof () === 'number'`</td>
 *          <td>other rules</td>
 *      </tr>
 *      <tr>
 *          <td>***text***</td>
 *          <td>`value!==""`</td>
 *          <td>`typeof () === 'string'`</td>
 *          <td>other rules</td>
 *      </tr>
 *      <tr>
 *          <td>***select***</td>
 *          <td>`value!==""`</td>
 *          <td>`typeof () === 'string'`</td>
 *          <td>other rules</td>
 *      </tr>
 *      <tr>
 *          <td>***date***</td>
 *          <td>`value!==""`</td>
 *          <td>`typeof () === 'datetime'`</td>
 *          <td>other rules</td>
 *      </tr>
 *      <tr>
 *          <td>***checkbox***</td>
 *          <td>`N/D`</td>
 *          <td>`typeof () === 'bool'`</td>
 *          <td>other rules</td>
 *      </tr>
 *      <tr>
 *          <td>***radio***</td>
 *          <td>`N/D`</td>
 *          <td>`typeof () === 'number'`</td>
 *          <td>other rules</td>
 *      </tr>
 *      <tr>
 *          <td>***collection***</td>
 *          <td>`value.length > 0`</td>
 *          <td>`typeof () === 'array'`</td>
 *          <td>other rules</td>
 *      </tr>
 *  </table>
 */
export default class FieldRules {
    
    /**
     * Konfiguracja walidacji pola
     *
     * @param {string} type - typ pola
     * @param {boolean} [required] - (opcjonalny) - czy pole jest wymagane
     * @param {RegExp} [correctness] - (opcjonalny) - RegExp do sprawdzenia poprawności wartości
     */
    constructor(type, required, correctness) {
        this.type = type;
        if (required !== undefined) this.required = required;
        if (correctness !== undefined) this.correctness = correctness;
    }
}