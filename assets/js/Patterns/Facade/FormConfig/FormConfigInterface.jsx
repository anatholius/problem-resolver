/**
 * @interface
 *
 * @property {string} type - typ konfigu
 * @property {ApiConfig} apiConfig - konfiguracja Api backendowego
 * @property {Object} fields - konfiguracja encji
 * @property {ItemConfig} item - konfiguracja encji
 * @property {CollectionConfig} collection - konfiguracja kolekcji
 * @property {FormConfig} form - konfiguracja kolekcji
 * @property {ValidationConfig} validation - konfiguracja kolekcji
 * @property {Object} [data] Optional - konfiguracja kolekcji
 */
export default class FormConfigInterface {
    /** @type string */
    type;
    /** @type ApiConfig */
    apiConfig;
    /** @type Object */
    fields;
    /** @type ItemConfig */
    item;
    /** @type CollectionConfig */
    collection;
    /** @type FormConfig */
    form;
    /** @type ValidationConfig */
    validation;
    /** @type Object */
    data;
}