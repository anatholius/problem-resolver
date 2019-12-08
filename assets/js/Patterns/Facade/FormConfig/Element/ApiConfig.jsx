/**
 * @property {string} action
 */
export default class ApiConfig {
    /** @type {string} - nazwa akcji */
    action = "";
    
    /**
     * @param {string} action
     */
    constructor(action) {
        this.action = action;
    }
    
}